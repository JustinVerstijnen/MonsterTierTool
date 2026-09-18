/* PNG tEXt chunk: portable, lossless ranking metadata with CRC verification. */
(() => {
  'use strict';
  const signature = [137,80,78,71,13,10,26,10];
  const keyword = 'MonsterTier';
  function crc(bytes) { let value = 0xffffffff; for (const byte of bytes) { value ^= byte; for (let n=0;n<8;n++) value = (value >>> 1) ^ ((value & 1) ? 0xedb88320 : 0); } return (value ^ 0xffffffff) >>> 0; }
  function chunks(bytes) {
    if (!signature.every((b,i) => bytes[i] === b)) throw Error('This file is not a valid PNG.');
    const view = new DataView(bytes.buffer,bytes.byteOffset,bytes.byteLength), result=[];
    let offset=8, ended=false;
    while (offset+12<=bytes.length) {
      const length=view.getUint32(offset), end=offset+12+length;
      if(end>bytes.length) throw Error('The PNG is corrupted.');
      const type=String.fromCharCode(...bytes.subarray(offset+4,offset+8));
      if(view.getUint32(end-4)!==crc(bytes.subarray(offset+4,end-4))) throw Error('The PNG is corrupted (invalid checksum).');
      result.push({type,offset,end,data:bytes.subarray(offset+8,end-4)});
      offset=end;
      if(type==='IEND'){ended=true;break;}
    }
    if(!ended) throw Error('The PNG is incomplete.');
    return result;
  }
  function write(bytes,state) {
    const end=chunks(bytes).find(c=>c.type==='IEND').offset;
    // ASCII-only JSON keeps this standards-compliant Latin-1 tEXt, including Unicode titles.
    const json=JSON.stringify(state).replace(/[\u007f-\uffff]/g,c=>'\\u'+c.charCodeAt(0).toString(16).padStart(4,'0'));
    const data=new TextEncoder().encode(keyword+'\0'+json);
    const chunk=new Uint8Array(data.length+12),view=new DataView(chunk.buffer);
    view.setUint32(0,data.length);chunk.set([116,69,88,116],4);chunk.set(data,8);view.setUint32(chunk.length-4,crc(chunk.subarray(4,chunk.length-4)));
    const output=new Uint8Array(bytes.length+chunk.length);output.set(bytes.subarray(0,end));output.set(chunk,end);output.set(bytes.subarray(end),end+chunk.length);return output;
  }
  function read(bytes) {
    for(const chunk of chunks(bytes)) if(chunk.type==='tEXt') {
      const zero=chunk.data.indexOf(0);
      if(new TextDecoder().decode(chunk.data.subarray(0,zero))===keyword) {
        if(chunk.data.length>1024*1024) throw Error('The metadata is too large.');
        try{return JSON.parse(new TextDecoder().decode(chunk.data.subarray(zero+1)));}catch{throw Error('The tier data is corrupted.');}
      }
    }
    throw Error('No Monster Tier data found. Use a PNG exported by this tool.');
  }
  window.MonsterPNG={write,read};
})();
