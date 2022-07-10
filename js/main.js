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
    let j = 0
    tarifPluses.forEach(el => {
        el.addEventListener('click', function (e) {

            if (e.target.previousElementSibling.id != "typeShoes") {
                let prev
                let next
                switch (e.target.previousElementSibling.id) {
                    case "classShoe":
                        const classShoe = document.querySelector("#classShoe")
                        j++
                        j = j == 5 ? 0 : j % 5
                        currentSet.rareThis = Object.keys(prices.rares)[j].toLowerCase()
                        const bgColor = prices.rares[currentSet.rareThis].color
                        currentSet.upgrade = prices.rares[currentSet.rareThis]['upgrade'][1]
                        currentSet.getPoint()
                        points.innerHTML = currentSet.points
                        inputBase.forEach(el => {
                            el.placeholder = `${prices.rares[currentSet.rareThis]['baseParam'][0]}-${prices.rares[currentSet.rareThis]['baseParam'][1]}`
                            el.value = ""
                        })
                        classShoe.innerHTML = currentSet.rareThis
                        classShoe.style.backgroundColor = bgColor
                        currentSet.getAmt()
                        currentSet.updateLimit()
                        break
                    case "lvlShoes":
                        const lvlShoes = document.querySelector("#lvlShoes")
                        prev = lvlShoes.previousElementSibling
                        if (Number(lvlShoes.innerHTML) <= 29) {
                            lvlShoes.innerHTML = Number(lvlShoes.innerHTML) + 1
                            currentSet.level = Number(lvlShoes.innerHTML)
                            currentSet.getPoint()
                            points.innerHTML = currentSet.points
                            currentSet.getAmt()
                        }
                        if (Number(lvlShoes.innerHTML) > 0) {
                            prev.classList.add('active')
                        }
                        if (Number(lvlShoes.innerHTML) == 30) {
                            e.target.classList.remove("active")
                            e.target.classList.add("inactive")
                        }
                        currentSet.getAmt()
                        currentSet.updateLimit()
                        break
                    case "energyPerDay":
                        const energy = document.querySelector("#energyPerDay")
                        prev = energy.previousElementSibling
                        if (Number(energy.innerHTML) <= 19) {
                            energy.innerHTML = Number(energy.innerHTML) + 1
                            currentSet.energy = Number(energy.innerHTML)
                        }
                        if (Number(energy.innerHTML) > 0) {
                            prev.classList.add('active')
                        }
                        if (Number(energy.innerHTML) == 20) {
                            e.target.classList.remove("active")
                            e.target.classList.add("inactive")
                        }
                        currentSet.getAmt()
                        break
                }
            } else {
                i++
                i = i == 4 ? 0 : i % 4
                document.querySelector("#typeShoes").innerHTML = Object.keys(prices.types)[i]
                let value = Object.keys(prices.types)[i].toLowerCase()
                currentSet.typeShoe = prices.types[value]
                currentSet.getAmt()
            }
        })
    })
    tarifMinuses.forEach(el => {
        el.addEventListener('click', function (e) {
            if (e.target.nextElementSibling.id != "typeShoes") {
                switch (e.target.nextElementSibling.id) {
                    case "classShoe":
                        const classShoe = document.querySelector("#classShoe")
                        j--
                        j = j < 0 ? 4 : j % 5
                        currentSet.rareThis = Object.keys(prices.rares)[j].toLowerCase()
                        const bgColor = prices.rares[currentSet.rareThis].color
                        currentSet.upgrade = prices.rares[currentSet.rareThis]['upgrade'][1]
                        currentSet.getPoint()
                        points.innerHTML = currentSet.points
                        inputBase.forEach(el => {
                            el.placeholder = `${prices.rares[currentSet.rareThis]['baseParam'][0]}-${prices.rares[currentSet.rareThis]['baseParam'][1]}`;
                            el.value = ""
                        })
                        classShoe.innerHTML = currentSet.rareThis
                        classShoe.style.backgroundColor = bgColor
                        currentSet.getAmt()
                        currentSet.updateLimit()
                        break
                    case "lvlShoes":
                        const lvlShoes = document.querySelector("#lvlShoes")
                        next = lvlShoes.nextElementSibling
                        if (Number(lvlShoes.innerHTML) > 0) {
                            lvlShoes.innerHTML = Number(lvlShoes.innerHTML) - 1
                            currentSet.level = Number(lvlShoes.innerHTML)
                            currentSet.getPoint()
                            points.innerHTML = currentSet.points
                            currentSet.getAmt()
                        }
                        if (Number(lvlShoes.innerHTML) > 0) {
                            e.target.classList.add('active')
                        } else {
                            e.target.classList.remove('active')
                            e.target.classList.add('inactive')
                        }
                        next.classList.add("active")
                        next.classList.remove("inactive")
                        currentSet.getAmt()
                        currentSet.updateLimit()
                        break
                    case "energyPerDay":
                        const energy = document.querySelector("#energyPerDay")
                        next = energy.nextElementSibling
                        if (Number(energy.innerHTML) > 0) {
                            energy.innerHTML = Number(energy.innerHTML) - 1
                            currentSet.energy = Number(energy.innerHTML)
                        }
                        if (Number(energy.innerHTML) > 0) {
                            e.target.classList.add('active')
                        } else {
                            e.target.classList.remove('active')
                            e.target.classList.add('inactive')
                        }
                        next.classList.add("active")
                        next.classList.remove("inactive")
                        currentSet.getAmt()
                        break
                }
            } else {
                i--
                i = i < 0 ? 3 : i % 4
                document.querySelector("#typeShoes").innerHTML = Object.keys(prices.types)[i]
                let value = Object.keys(prices.types)[i].toLowerCase()
                currentSet.typeShoe = prices.types[value]
                currentSet.getAmt()
            }
        })
    })
}
tarifBtnInit()

//функционал кнопок плюс-минус в атрибутах
plusesStats.forEach(el => {
    el.addEventListener('click', function (e) {
        if (currentSet.points > 0) {
            let divInput = e.target.previousElementSibling
            let prev = divInput.previousElementSibling
            currentSet.points--
            points.innerHTML = currentSet.points
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
        common: {
            limit: [5, 35],
            baseParam: [1, 10],
            upgrade: [0.1, 3], //Сотые доли и очки 
            color: "#babcbe",
        },
        uncommon: {
            limit: [10, 40],
            baseParam: [12, 22],
            upgrade: [0.1, 5],
            color: "#aed144",
        },
        rare: {
            limit: [15, 75],
            baseParam: [24, 25],
            upgrade: [0.1, 10],
            color: "#47aced",

        },
        epic: {
            limit: [20, 110],
            baseParam: [38, 60],
            upgrade: [0.12, 20],
            color: " #a398eb",

        },
        legendary: {
            limit: [30, 150],
            baseParam: [65, 115],
            upgrade: [0.15, 25],
            color: "#f5a836",

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
    upgrade: 3,
    basePerformance: 0,
    typeShoe: prices.types.ranger,
    points: 0,
    level: 0,
    energy: 0,
    getPoint: function () {
        this.points = this.level * this.upgrade
        return this.points
    },
    getAmt: function () {
        const amtPerDay = document.getElementById("amt-per-day")
        let amt = Number((this.energy * Number(performanceTotal.innerHTML) * this.typeShoe).toFixed(2))
        let destroy = this.energy * (1 ** (this.baseDurability / 1))
        income.innerHTML = amt + " ";
        amtPerDay.innerHTML = amt
    },
    getLimit: function () {
        let arrLimit = prices.rares[this.rareThis].limit
        if (this.level == 0) {
            return arrLimit[0]
        } else {
            let perLevel = (arrLimit[1] - arrLimit[0]) / 30
            let currentLimit = arrLimit[0] + perLevel * this.level
            return currentLimit
        }
    },
    updateLimit: function(){
        const limitPerDaySpan = document.getElementById("limit-per-level")
        limitPerDaySpan.innerHTML = this.getLimit()
    }
}