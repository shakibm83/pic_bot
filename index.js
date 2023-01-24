const { Telegraf, Markup } = require("telegraf")
const { default: axios } = require("axios")
const cheerio = require("cheerio")

const bot = new Telegraf("5360519003:AAE5ni-hUIevCzNkV9iXo9h1BpIe4Oqr3Lc")
let startButtons =  Markup.keyboard([
    [Markup.button.text('Teen'), Markup.button.text('Pussy'), Markup.button.text('MILF'), Markup.button.text('Doggystyle')],
    [Markup.button.text('Small tits'), Markup.button.text('Cum in Mouth'), Markup.button.text('POV'), Markup.button.text('Ass')],
    [Markup.button.text("news"), Markup.button.text('help')]
]).resize(true)
async function getTopCategories() {
    let url = 'https://pornpic.com/'
    let tp = []
    await axios.get(url).then(({ data }) => {
        let $ = cheerio.load(data)
        let categories = $('.top-left i').toArray()
        categories.forEach((elem, i) => {
            if (i > 8) return
            tp.push(elem.next.data)
        })
        console.log(tp);
    }).catch(r => console.log(r))
    startButtons = Markup.keyboard([
        [Markup.button.text(tp[0]), Markup.button.text(tp[1]), Markup.button.text(tp[2]), Markup.button.text(tp[3])],
        [Markup.button.text(tp[4]), Markup.button.text(tp[5]), Markup.button.text(tp[6]), Markup.button.text(tp[7])],
        [Markup.button.text("news"), Markup.button.text('help')]
    ]).resize(true)
}
bot.start(async (ctx) => {
    try{
    // await getTopCategories()
    ctx.reply("به ربات پورن خوش آمدید. لطفا در کانال زیر عضو شوید تا در صورت فیلتر ربات به آن دسترسی داشته باشید.")
    ctx.reply("t.me/pornpiczapas", startButtons)
    }catch{
        console.log('an error occurred');
    }
})
bot.hears('back', async (ctx) => {
    try{
    // await getTopCategories()
    ctx.reply("چه نوع عکسی میخوای؟", startButtons)
    }catch{
        console.log('an error occurred');
    }
})
bot.help(ctx => {
    try{
    ctx.reply("به ربات ی چیزی مثل teen ارسال کنید.")
    }
    catch{
        console.log('an error occurred');
    }
})
let photos = []
let photoIndex = 0
bot.hears('next', ctx => {
    try{
    photoIndex++
    ctx.replyWithPhoto(photos[photoIndex])
    }
    catch{
        console.log('an error occurred');
    }
})
bot.on("message", async(ctx) => {
    try {
        photos = []
        let buttons = Markup.keyboard([
            [Markup.button.text("next")],
            [Markup.button.text("back")],
        ]).resize(true)
        let baseUrl = "https://yandex.com/"
        let q = ctx.message.text
        console.log(q);
        let url = `https://yandex.com/images/search?text=${q}&ncrnd=0.662153474352543`
        await axios.get(url).then(({ data }) => {
            let $ = cheerio.load(data)
            let extractLinks = $('.serp-item__thumb').toArray()
            for (elem of extractLinks) {
                photos.push(`https:${elem.attribs.src}`)
            }
            ctx.replyWithPhoto(photos[photoIndex], buttons)
        }).catch(err=>console.log('err'))
    } catch {
        console.log('an error occurred');
    }
})
console.log("started");
bot.launch()