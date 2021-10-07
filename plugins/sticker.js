const { MessageType } = require('@adiwajshing/baileys')
const { sticker } = require('../lib/sticker')
let handler = async (m, { conn, args, usedPrefix, command }) => {
  var stiker = false
  
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (/image/.test(mime)) {
      let img = await q.download()
      if (!img) throw `reply to image with caption ${usedPrefix + command}`
   var   stiker = await sticker(img, false, 'Chitanda Eru', 'Oreki-San')
    } else if (/video/.test(mime)) {
      if ((q.msg || q).seconds > 11) return m.reply('10 seconds max!')
      let img = await q.download()
      if (!img) throw `reply video/gif with caption ${usedPrefix + command}`
    var  stiker = await sticker(img, false, 'Chitanda Eru', 'Oreki-San')
    } else if (/webp/.test(mime)) {
      let img = await q.download()
      if (!img) throw `reply sticker with caption ${usedPrefix + command}`
  var    stiker = await sticker(img, false, 'Chitanda Eru', 'Oreki-San')
    } else if (args[0]) {
      if (isUrl(args[0])) stiker = await sticker(false, args[0], 'Chitanda Eru', 'Oreki-San')
      else return m.reply('Invalid URL!')
    }

    if (stiker){ conn.sendMessage(m.chat, stiker, MessageType.sticker, {
      quoted: m
    })}
    else throw 'Error, try to reply to the photo/make sure the mime is correct'
  
}
handler.help = ['stiker (caption|reply media)', 'stiker <url>', 'stikergif (caption|reply media)', 'stikergif <url>']
handler.tags = ['sticker']
handler.command = /^s(tic?ker)?(gif)?(wm)?$/i

module.exports = handler

const isUrl = (text) => {
  return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'))
}
