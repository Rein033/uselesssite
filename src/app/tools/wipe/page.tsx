import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Disk Wipe Script | Privé | UselessSite',
  robots: { index: false, follow: false },
}

const SCRIPT = `Start-Sleep -Seconds 10

$excludedLetters = @("X")

$disks = Get-Disk

foreach ($disk in $disks) {

    if ($disk.BusType -eq "USB") {
        Write-Host "Overgeslagen USB: Disk $($disk.Number)"
        continue
    }

    $skip = $false
    $partitions = Get-Partition -DiskNumber $disk.Number -ErrorAction SilentlyContinue

    foreach ($part in $partitions) {
        if ($excludedLetters -contains $part.DriveLetter) {
            $skip = $true
        }
    }

    if ($skip -eq $true) {
        Write-Host "Overgeslagen letter: Disk $($disk.Number)"
        continue
    }

    $tmpFile = "X:\\wipe_$($disk.Number).txt"
    $inhoud = "select disk $($disk.Number)\`nclean"
    $inhoud | Out-File -FilePath $tmpFile -Encoding ASCII
    diskpart /s $tmpFile
    Remove-Item $tmpFile
    Write-Host "Klaar: Disk $($disk.Number)"
}

Write-Host "Gereed!"`

export default function WipePage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10 space-y-8">
      <div id="pw-gate" className="space-y-6">
        <div>
          <p className="text-sm text-muted-foreground uppercase tracking-widest mb-2">Privé Tool</p>
          <h1 className="text-3xl font-black mb-1">Disk Wipe Script</h1>
          <p className="text-muted-foreground">Deze pagina is beveiligd met een wachtwoord.</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 space-y-4">
          <label className="text-sm font-medium block" htmlFor="pw-input">Wachtwoord</label>
          <input
            id="pw-input"
            type="password"
            className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Voer wachtwoord in"
            autoComplete="current-password"
          />
          <p id="pw-error" className="text-sm text-red-500 hidden">Ongeldig wachtwoord.</p>
          <button id="pw-btn" className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all">
            Toegang
          </button>
        </div>
      </div>

      <div id="pw-content" className="hidden space-y-6">
        <div>
          <p className="text-sm text-muted-foreground uppercase tracking-widest mb-2">Privé Tool — T-006</p>
          <h1 className="text-3xl font-black mb-1">Disk Wipe Script</h1>
          <p className="text-muted-foreground">PowerShell script dat alle niet-USB, niet-X: schijven wist via diskpart.</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">DiskWipe.ps1</span>
            <button id="copy-btn" className="px-3 py-1.5 rounded-lg bg-secondary hover:bg-secondary/80 text-xs font-medium transition-colors">
              Kopieer
            </button>
          </div>
          <pre id="script-code" className="bg-background border border-border rounded-lg p-4 text-xs font-mono overflow-x-auto whitespace-pre text-green-400">
            <code>{SCRIPT}</code>
          </pre>
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 text-xs text-yellow-400">
            <strong>Let op:</strong> Dit script wist permanent alle data op de geselecteerde schijven. Geen herstel mogelijk.
          </div>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{ __html: `
(function(){
  var HASH = "06b303a32da2f8d1b49d7056da227ae4";
  ${MD5_FN}
  function unlock(){
    var val = document.getElementById('pw-input').value;
    if(md5(val) === HASH){
      document.getElementById('pw-gate').classList.add('hidden');
      document.getElementById('pw-content').classList.remove('hidden');
    } else {
      document.getElementById('pw-error').classList.remove('hidden');
    }
  }
  document.getElementById('pw-btn').addEventListener('click', unlock);
  document.getElementById('pw-input').addEventListener('keydown', function(e){ if(e.key==='Enter') unlock(); });
  document.getElementById('copy-btn').addEventListener('click', function(){
    var code = document.getElementById('script-code').innerText;
    navigator.clipboard.writeText(code).then(function(){
      var btn = document.getElementById('copy-btn');
      btn.textContent = 'Gekopieerd!';
      setTimeout(function(){ btn.textContent = 'Kopieer'; }, 2000);
    });
  });
})();
      `}} />
    </div>
  )
}

const MD5_FN = `function md5(s){function safe_add(x,y){var lsw=(x&0xFFFF)+(y&0xFFFF);var msw=(x>>16)+(y>>16)+(lsw>>16);return(msw<<16)|(lsw&0xFFFF);}function bit_rol(num,cnt){return(num<<cnt)|(num>>>(32-cnt));}function md5_cmn(q,a,b,x,s,t){return safe_add(bit_rol(safe_add(safe_add(a,q),safe_add(x,t)),s),b);}function md5_ff(a,b,c,d,x,s,t){return md5_cmn((b&c)|((~b)&d),a,b,x,s,t);}function md5_gg(a,b,c,d,x,s,t){return md5_cmn((b&d)|(c&(~d)),a,b,x,s,t);}function md5_hh(a,b,c,d,x,s,t){return md5_cmn(b^c^d,a,b,x,s,t);}function md5_ii(a,b,c,d,x,s,t){return md5_cmn(c^(b|(~d)),a,b,x,s,t);}function md5_blks(s){var nblk=((s.length+8)>>6)+1;var blks=new Array(nblk*16);for(var i=0;i<nblk*16;i++)blks[i]=0;for(var i=0;i<s.length;i++)blks[i>>2]|=s.charCodeAt(i)<<((i%4)*8);blks[s.length>>2]|=0x80<<((s.length%4)*8);blks[nblk*16-2]=s.length*8;return blks;}var x=md5_blks(s);var a=1732584193,b=-271733879,c=-1732584194,d=271733878;for(var i=0;i<x.length;i+=16){var olda=a,oldb=b,oldc=c,oldd=d;a=md5_ff(a,b,c,d,x[i+0],7,-680876936);d=md5_ff(d,a,b,c,x[i+1],12,-389564586);c=md5_ff(c,d,a,b,x[i+2],17,606105819);b=md5_ff(b,c,d,a,x[i+3],22,-1044525330);a=md5_ff(a,b,c,d,x[i+4],7,-176418897);d=md5_ff(d,a,b,c,x[i+5],12,1200080426);c=md5_ff(c,d,a,b,x[i+6],17,-1473231341);b=md5_ff(b,c,d,a,x[i+7],22,-45705983);a=md5_ff(a,b,c,d,x[i+8],7,1770035416);d=md5_ff(d,a,b,c,x[i+9],12,-1958414417);c=md5_ff(c,d,a,b,x[i+10],17,-42063);b=md5_ff(b,c,d,a,x[i+11],22,-1990404162);a=md5_ff(a,b,c,d,x[i+12],7,1804603682);d=md5_ff(d,a,b,c,x[i+13],12,-40341101);c=md5_ff(c,d,a,b,x[i+14],17,-1502002290);b=md5_ff(b,c,d,a,x[i+15],22,1236535329);a=md5_gg(a,b,c,d,x[i+1],5,-165796510);d=md5_gg(d,a,b,c,x[i+6],9,-1069501632);c=md5_gg(c,d,a,b,x[i+11],14,643717713);b=md5_gg(b,c,d,a,x[i+0],20,-373897302);a=md5_gg(a,b,c,d,x[i+5],5,-701558691);d=md5_gg(d,a,b,c,x[i+10],9,38016083);c=md5_gg(c,d,a,b,x[i+15],14,-660478335);b=md5_gg(b,c,d,a,x[i+4],20,-405537848);a=md5_gg(a,b,c,d,x[i+9],5,568446438);d=md5_gg(d,a,b,c,x[i+14],9,-1019803690);c=md5_gg(c,d,a,b,x[i+3],14,-187363961);b=md5_gg(b,c,d,a,x[i+8],20,1163531501);a=md5_gg(a,b,c,d,x[i+13],5,-1444681467);d=md5_gg(d,a,b,c,x[i+2],9,-51403784);c=md5_gg(c,d,a,b,x[i+7],14,1735328473);b=md5_gg(b,c,d,a,x[i+12],20,-1926607734);a=md5_hh(a,b,c,d,x[i+5],4,-378558);d=md5_hh(d,a,b,c,x[i+8],11,-2022574463);c=md5_hh(c,d,a,b,x[i+11],16,1839030562);b=md5_hh(b,c,d,a,x[i+14],23,-35309556);a=md5_hh(a,b,c,d,x[i+1],4,-1530992060);d=md5_hh(d,a,b,c,x[i+4],11,1272893353);c=md5_hh(c,d,a,b,x[i+7],16,-155497632);b=md5_hh(b,c,d,a,x[i+10],23,-1094730640);a=md5_hh(a,b,c,d,x[i+13],4,681279174);d=md5_hh(d,a,b,c,x[i+0],11,-358537222);c=md5_hh(c,d,a,b,x[i+3],16,-722521979);b=md5_hh(b,c,d,a,x[i+6],23,76029189);a=md5_hh(a,b,c,d,x[i+9],4,-640364487);d=md5_hh(d,a,b,c,x[i+12],11,-421815835);c=md5_hh(c,d,a,b,x[i+15],16,530742520);b=md5_hh(b,c,d,a,x[i+2],23,-995338651);a=md5_ii(a,b,c,d,x[i+0],6,-198630844);d=md5_ii(d,a,b,c,x[i+7],10,1126891415);c=md5_ii(c,d,a,b,x[i+14],15,-1416354905);b=md5_ii(b,c,d,a,x[i+5],21,-57434055);a=md5_ii(a,b,c,d,x[i+12],6,1700485571);d=md5_ii(d,a,b,c,x[i+3],10,-1894986606);c=md5_ii(c,d,a,b,x[i+10],15,-1051523);b=md5_ii(b,c,d,a,x[i+1],21,-2054922799);a=md5_ii(a,b,c,d,x[i+8],6,1873313359);d=md5_ii(d,a,b,c,x[i+15],10,-30611744);c=md5_ii(c,d,a,b,x[i+6],15,-1560198380);b=md5_ii(b,c,d,a,x[i+13],21,1309151649);a=md5_ii(a,b,c,d,x[i+4],6,-145523070);d=md5_ii(d,a,b,c,x[i+11],10,-1120210379);c=md5_ii(c,d,a,b,x[i+2],15,718787259);b=md5_ii(b,c,d,a,x[i+9],21,-343485551);a=safe_add(a,olda);b=safe_add(b,oldb);c=safe_add(c,oldc);d=safe_add(d,oldd);}function rhex(n){var s='',j=0;for(;j<4;j++)s+=('0'+(n>>>(j*8)&0xFF).toString(16)).slice(-2);return s;}return rhex(a)+rhex(b)+rhex(c)+rhex(d);}`
