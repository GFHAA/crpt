Object.prototype.getFirstProperty = function () {
    for (let i in this) {
        return this[i];
        break;
    }
}


const performance = document.querySelector("#performance")
const performanceTotal = document.querySelector("#performanceTotal")

const inputBase = Array.from(document.querySelectorAll(".form-control[type = number]"))
const typeShoe = Array.from(document.querySelectorAll("input[name = tarrif]"))
const inputDurability = document.querySelector("#durability")

const tarifPluses = Array.from(document.querySelectorAll(".SelectBox .next-icon"))
const tarifMinuses = Array.from(document.querySelectorAll(".SelectBox .prev-icon"))

const plusesStats = Array.from(document.querySelectorAll(".inner-stats .next-icon"))
const minusStats = Array.from(document.querySelectorAll(".inner-stats .prev-icon"))


const points = document.querySelector("#points")
const income = document.querySelector("#income")

//функционал кнопок плюс-минус сверху
function tarifBtnInit() {
    let i = 0
    tarifPluses.forEach(el => {
        el.addEventListener('click', function (e) {

            if (e.target.previousElementSibling.id != "typeShoes") {
                console.log(e.target.previousElementSibling.id)
            } else {
                i++
                i = i == 4 ? 0 : i % 4
                document.querySelector("#typeShoes").innerHTML = Object.keys(prices.types)[i]
                let value = Object.keys(prices.types)[i].toLowerCase()
                currentSet.typeShoe = prices.types[value]
                console.log(currentSet.typeShoe)
            }
        })
    })
    tarifMinuses.forEach(el => {
        // i = 4
        el.addEventListener('click', function (e) {
            if (e.target.nextElementSibling.id != "typeShoes") {
                // console.log(e.target.nextElementSibling.id)
            } else {
                i--
                i = i < 0 ? 3 : i % 4
                document.querySelector("#typeShoes").innerHTML = Object.keys(prices.types)[i]
                let value = Object.keys(prices.types)[i].toLowerCase()
                currentSet.typeShoe = prices.types[value]
                console.log(currentSet.typeShoe)

            }
        })
    })
}
tarifBtnInit()

//функционал кнопок плюс-минус в атрибутах
plusesStats.forEach(el => {
    el.addEventListener('click', function (e) {
        if (currentSet.points > 0) {
            currentSet.points--
            points.innerHTML = currentSet.points
            let divInput = e.target.previousElementSibling
            let prev = divInput.previousElementSibling
            divInput.innerHTML = Number(divInput.innerHTML) + 1
            currentSet.getAmt()
            if (Number(divInput.innerHTML) > 0) {
                prev.classList.add('active')
            }
            if (currentSet.points == 0) {
                plusesStats.forEach(el => {
                    el.classList.remove("active")
                    el.classList.add("inactive")
                })
            }
        }
    })
})

minusStats.forEach(el => {
    el.addEventListener('click', function (e) {
        let divInput = e.target.nextElementSibling
        if (Number(divInput.innerHTML) > Number(performance.value)) {
            divInput.innerHTML = Number(divInput.innerHTML) - 1
            currentSet.points++
            points.innerHTML = currentSet.points
            currentSet.getAmt()
            if (Number(divInput.innerHTML) == Number(performance.value)) {
                e.target.classList.remove("active")
            }
            if (currentSet.points > 0) {
                plusesStats.forEach(el => {
                    el.classList.add("active")
                    el.classList.remove("inactive")
                })
            }
        }
    })
})

//установление редкости ботинка
typeShoe.forEach(el => {
    el.addEventListener('click', function (e) {
        currentSet.rareThis = e.target.id;
        currentSet.upgrade = prices.rares[currentSet.rareThis]['upgrade'][1]
        currentSet.getPoint()
        points.innerHTML = currentSet.points
        inputBase.forEach(el => {
            el.placeholder = `${prices.rares[currentSet.rareThis]['baseParam'][0]}-${prices.rares[currentSet.rareThis]['baseParam'][1]}`;
        })
        currentSet.getAmt()
    })
});
inputBase.forEach(el => {
    el.addEventListener("input", function (e) {
        let currentTotal = e.target.parentNode.nextElementSibling.childNodes[1].childNodes[3]
        currentTotal.innerHTML = Number(e.target.value)
    })
})
//ввод по базовым полям
performance.addEventListener('input', function (e) {
    currentSet.basePerformance = Number(e.target.value);
    performanceTotal.innerHTML = Number(e.target.value)
    currentSet.getAmt()
})//основная МОЩЬ ботинка

inputDurability.addEventListener('input', function (e) {
    console.log(1)
    currentSet.baseDurability = Number(e.target.value);
    currentSet.getAmt()
})//прочность

const prices = {
    rares: {
        'common': {
            limit: [5, 35],
            baseParam: [1, 10],
            upgrade: [0.1, 3] //Сотые доли и очки 
        },
        'uncommon': {
            limit: [10, 40],
            baseParam: [12, 22],
            upgrade: [0.1, 5]
        },
        'rare': {
            limit: [15, 75],
            baseParam: [24, 25],
            upgrade: [0.1, 10]

        },
        'epic': {
            limit: [20, 110],
            baseParam: [38, 60],
            upgrade: [0.12, 20]

        },
        'legendary': {
            limit: [30, 150],
            baseParam: [65, 115],
            upgrade: [0.15, 25]

        },

    },
    types: {
        ranger: 0.9,
        hiker: 1,
        sprinter: 1.15,
        // coacher = [0.95, 1.15]
        coacher: 1.15
    }
}

let currentSet = {
    rareThis: 'common',
    baseDurability: 1,
    upgrade: 0,
    basePerformance: 0,
    typeShoe: prices.types.ranger,
    points: 0,
    level: 1,
    energy: 1,
    getPoint: function () {
        this.points = this.level * this.upgrade
        return this.points
    },
    getAmt: function () {
        // let amt = this.energy * (Number(this.basePerformance) + Number(performanceTotal.innerHTML)) * this.typeShoe
        let amt = Number((this.energy * Number(performanceTotal.innerHTML) * this.typeShoe).toFixed(2))
        let destroy = this.energy * (1 ** (this.baseDurability / 1))
        income.innerHTML = amt + " ";
    },
}