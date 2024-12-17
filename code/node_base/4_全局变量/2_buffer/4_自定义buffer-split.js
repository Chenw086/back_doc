Buffer.prototype.split = function(seq) {
    let len = Buffer.from(seq).length
    let ret = []
    let start = 0
    let offset = 0
    while ((offset = this.indexOf(seq, start)) !== -1) {
        ret.push(this.slice(start, offset))
        start = offset + len
    }
    ret.push(this.slice(start))
    return ret
}

const buf = Buffer.from('阿斯卡纶大家啊看来大家阿拉斯加打卡四六级')
let bufArr = buf.split('阿')
console.log(bufArr)
/*  
[
  <Buffer >,
  <Buffer e6 96 af e5 8d a1 e7 ba b6 e5 a4 a7 e5 ae b6 e5 95 8a e7 9c 8b e6 9d a5 e5 a4 a7 e5 ae b6>,
  <Buffer e6 8b 89 e6 96 af e5 8a a0 e6 89 93 e5 8d a1 e5 9b 9b e5 85 ad e7 ba a7>
]
*/
console.log(bufArr.toString())  // ,斯卡纶大家啊看来大家,拉斯加打卡四六级
