let allPlans = [
    { id: 1, title: 'Arcade', price: 9, year_price: 90,  img: './assets/images/icon-arcade.svg' },
    { id: 2, title: 'Advanced', price: 12, year_price: 120, img: './assets/images/icon-advanced.svg' },
    { id: 3, title: 'Pro', price: 15, year_price: 150, img: './assets/images/icon-pro.svg' },
]
let Addon = [
    { id: 1, title: 'Online service', description: 'Access to multiplayer games', price: 1, year_price: 10},
    { id: 2, title: 'Larger storage', description: 'Extra 1TB of cloud save', price: 2, year_price: 20},
    { id: 3, title: 'Customizable Profile', description: 'Custom theme on your profile', price: 2, year_price: 20},
]
let userPlanSelected = [],
    userAddonSelected = [],
    totalPriceValue = 0,
    selected_plan = 'month';
let $ = document


let InputName = document.getElementById('InputName'),
    InputEmail = document.getElementById('InputEmail'),
    InputPhone = document.getElementById('InputPhone'),
    message = document.querySelector('.message'),
    step1 = document.querySelector('.step_1'),
    num1 = document.querySelector('.num1'),
    btn1 = document.querySelector('.btn_1');

let step2 = document.querySelector('.step_2'),
    num2 = document.querySelector('.num2'),
    my_switch = document.querySelector('#my_switch'),
    step_2_message = document.querySelector('.step_2_message'),
    btn2 = document.querySelector('.btn_2'),
    btn2_back = document.querySelector('.btn_2_back');

let step3 = document.querySelector('.step_3'),
    num3 = document.querySelector('.num3'),
    btn3 = document.querySelector('.btn_3'),
    btn3_back = document.querySelector('.btn_3_back');

let step4 = document.querySelector('.step_4'),
    num4 = document.querySelector('.num4'),
    btn4 = document.querySelector('.btn_4'),
    btn4_back = document.querySelector('.btn_4_back');

let step5 = document.querySelector('.step_5');
// let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
let mailFormat = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;


//  start step_1
btn1.addEventListener('click',function () {
    if (InputName.value === '' || InputEmail.value === '' || InputPhone.value === '') {
        message.classList.replace('hide','show')
        message.innerHTML = 'Please fill all fields'
    } else if (!mailFormat.test(InputEmail.value)) {
        message.classList.replace('hide','show')
        message.innerHTML = 'Please fill email correctly'
    } else {
        message.classList.replace('show','hide')
        step1.classList.replace('d-flex','d-none')
        step2.classList.replace('d-none','d-flex')
        num1.classList.toggle('selected_sidebar')
        num2.classList.toggle('selected_sidebar')
        my_switch.checked = true
    }
})
// end step_1
// start step_2
plan()
function plan(){
    allPlans.forEach(function (allPlans) {
        let productContainer = $.createElement('div')
        productContainer.className = 'border rounded-4 p-3 me-3 sub_plan'

        let productImg = $.createElement('img')
        productImg.classList.add('img-fluid')
        productImg.setAttribute('src', allPlans.img)

        let productContainer2 = $.createElement('div')
        productContainer2.className = 'd-flex flex-column mt-3'

        let productTitleSpan = $.createElement('span')
        productTitleSpan.classList.add('fw-bold')
        productTitleSpan.innerHTML = allPlans.title

        let productPriceSpan = $.createElement('span')
        productPriceSpan.className = 'gray_color month_plan show'
        productPriceSpan.innerHTML = `$ ${allPlans.price} /mo`

        let productPriceYearSpan = $.createElement('span')
        productPriceYearSpan.className = 'gray_color year_plan hide'
        productPriceYearSpan.innerHTML = `$ ${allPlans.year_price} /mo`

        let productPriceYearMessageSpan = $.createElement('span')
        productPriceYearMessageSpan.className = 'year_plan hide'
        productPriceYearMessageSpan.innerHTML = '2 months free'

        productContainer.append(productImg , productContainer2 )
        productContainer2.append(productTitleSpan,productPriceSpan,productPriceYearSpan,productPriceYearMessageSpan)
        $.querySelector('.select_plan').append(productContainer)

        productContainer.addEventListener('click', function (e) {
            select_plan_graphic(e)
            select_plan_array(allPlans.id)
        })
    })
}
function select_plan_graphic (e) {
    let siblings = e.currentTarget.parentElement.children;
    for(let sib of siblings) {
        if (sib.classList.contains('selected')) {
            sib.classList.remove('selected')
        }
    }
    e.currentTarget.classList.add('selected')
}
function select_plan_array (allPlans_id) {
    let mainProduct = allPlans.find(function (product) {
        return product.id === allPlans_id
    })
    userPlanSelected.pop()
    userPlanSelected.push(mainProduct)
}
my_switch.addEventListener('change',function () {
    let year_plan = document.querySelectorAll('.year_plan'),
        month_plan = document.querySelectorAll('.month_plan');
    if (this.checked) {
        selected_plan = 'month'
        year_plan.forEach(function (item) {
            item.classList.replace('show','hide')
        })
        month_plan.forEach(function (item) {
            item.classList.replace('hide','show')
        })
    } else {
        selected_plan = 'year'
        year_plan.forEach(function (item) {
            item.classList.replace('hide','show')
        })
        month_plan.forEach(function (item) {
            item.classList.replace('show','hide')
        })
    }
    $.querySelector('.select_plan2').innerHTML =''
    userAddonSelected = []
    createAddon()
})

btn2.addEventListener('click',function () {
    if (userPlanSelected.length === 1) {
        step2.classList.replace('d-flex','d-none')
        step3.classList.replace('d-none','d-flex')
        num2.classList.toggle('selected_sidebar')
        num3.classList.toggle('selected_sidebar')
        step_2_message.classList.add('hide')
    } else {
        step_2_message.innerText = 'Please select only one option'
        step_2_message.classList.add('text-danger')
    }
})
btn2_back.addEventListener('click',function () {
    step2.classList.replace('d-flex','d-none')
    step1.classList.replace('d-none','d-flex')
    num2.classList.toggle('selected_sidebar')
    num1.classList.toggle('selected_sidebar')
})
// end step_2
// start step_3
createAddon()
function createAddon() {
    Addon.forEach(function (addon) {
        let addonContainer = $.createElement('div')
        addonContainer.className = 'd-flex flex-row justify-content-between align-items-center border rounded-4 my-2 px-3 py-3 sub_select_plan'

        let addonContainer2 = $.createElement('div')
        addonContainer2.className = 'd-flex flex-row'

        let addonCheckbox = $.createElement('input')
        addonCheckbox.type = 'checkbox'
        addonCheckbox.id = addon.id
        addonCheckbox.className = 'my_checkboxes'

        let addonP = $.createElement('p')
        addonP.className = 'd-flex flex-column'

        let addonLabelTittle = $.createElement('label')
        addonLabelTittle.className = 'fw-bold'
        addonLabelTittle.innerHTML = addon.title
        addonLabelTittle.setAttribute('for', addon.id)

        let addonLabelDescription = $.createElement('label')
        addonLabelDescription.className = 'gray_color'
        addonLabelDescription.innerHTML = addon.description
        addonLabelDescription.setAttribute('for', addon.id)

        let addonPriceSpan = $.createElement('span')
        addonPriceSpan.className = 'gray_color addon_price'
        if(selected_plan === 'year') {
            addonPriceSpan.innerHTML = `+$ ${addon.year_price} /year`
        }else if(selected_plan === 'month') {
            addonPriceSpan.innerHTML = `+$ ${addon.price} /mo`
        }

        addonContainer.append(addonContainer2,addonPriceSpan)
        addonContainer2.append(addonCheckbox,addonP)
        addonP.append(addonLabelTittle,addonLabelDescription)

        $.querySelector('.select_plan2').append(addonContainer)

        addonCheckbox.addEventListener('change', function (e) {
            if(e.target.checked) {
                let mainProduct = Addon.find(function (product) {
                    return product.id === addon.id
                })
                userAddonSelected.push(mainProduct)
            } else {
                userAddonSelected = userAddonSelected.filter(function (product) {
                    return product.id !== addon.id
                })
            }
        })
    })
}
function result(){
    userPlanSelected.forEach(function (plan) {
        let planContainer = $.createElement('div')
        planContainer.className = 'd-flex flex-row justify-content-between align-items-center w-100'

        let planContainer2 = $.createElement('div')
        planContainer2.className = 'd-flex flex-column'

        let planH6 = $.createElement('h6')
        planH6.innerHTML = plan.title

        let planChangeA = $.createElement('a')
        planChangeA.className = 'text-dark'
        planChangeA.innerHTML = 'Change'
        planChangeA.setAttribute('href', '#')

        let planDiv = $.createElement('div')

        let planPriceSpan = $.createElement('span')
        planPriceSpan.className = 'd-flex'
        if(selected_plan === 'year') {
            planPriceSpan.innerHTML = `+$ ${plan.year_price} /year`
        } else if(selected_plan === 'month') {
            planPriceSpan.innerHTML = `+$ ${plan.price} /mo`
        }

        let planHr = $.createElement('hr')

        planContainer2.append(planH6,planChangeA)
        planDiv.append(planPriceSpan)
        planContainer.append(planContainer2,planDiv)

        $.querySelector('.step_4_section_1').append(planContainer,planHr)
    })

    userAddonSelected.forEach(function (addon) {
        let addonContainer = $.createElement('div')
        addonContainer.className = 'd-flex flex-row justify-content-between mb-2'

        let addonTitleSpan = $.createElement('span')
        addonTitleSpan.className = 'gray_color'
        addonTitleSpan.innerHTML = addon.title

        let addonPriceSpan = $.createElement('span')
        if (selected_plan === 'year') {
            addonPriceSpan.innerHTML = `+$ ${addon.year_price} /year`
        } else if (selected_plan ==='month') {
            addonPriceSpan.innerHTML = `+$ ${addon.price} /mo`
        }

        addonContainer.append(addonTitleSpan,addonPriceSpan)

        $.querySelector('.step_4_section_1').append(addonContainer)
    })

    let totalSpan = $.createElement('span')
    if (selected_plan === 'year') {
        totalSpan.innerHTML = `Total (per year)`
    } else if (selected_plan ==='month') {
        totalSpan.innerHTML = `Total (per month)`
    }

    let totalPriceSpan = $.createElement('span')
    totalPriceSpan.className = 'fw-bold'
    totalPriceSpan.innerHTML = `+$ ${totalPriceValue}`

    $.querySelector('.step_4_section_2').append(totalSpan,totalPriceSpan)
}

function total(){
    totalPriceValue = 0
    userAddonSelected.forEach(function (product) {
        if (selected_plan === 'year') {
            totalPriceValue += product.year_price
        }
        else if (selected_plan ==='month') {
            totalPriceValue += product.price
        }
    })
    userPlanSelected.forEach(function (product) {
        if (selected_plan === 'year') {
            totalPriceValue += product.year_price
        } else if (selected_plan ==='month') {
            totalPriceValue += product.price
        }
    })
    return userPlanSelected
}

btn3.addEventListener('click',function () {
    step3.classList.replace('d-flex','d-none')
    step4.classList.replace('d-none','d-flex')
    num3.classList.toggle('selected_sidebar')
    num4.classList.toggle('selected_sidebar')
    $.querySelector('.step_4_section_1').innerHTML = ''
    $.querySelector('.step_4_section_2').innerHTML = ''

    total()
    result()

})
btn3_back.addEventListener('click',function () {
    step3.classList.replace('d-flex','d-none')
    step2.classList.replace('d-none','d-flex')
    num3.classList.toggle('selected_sidebar')
    num2.classList.toggle('selected_sidebar')
})
// end step_3
// start step_4
btn4_back.addEventListener('click',function () {
    step4.classList.replace('d-flex','d-none')
    step3.classList.replace('d-none','d-flex')
    num4.classList.toggle('selected_sidebar')
    num3.classList.toggle('selected_sidebar')
})
btn4.addEventListener('click',function () {
    step4.classList.replace('d-flex','d-none')
    step5.classList.replace('d-none','d-flex')
    num4.classList.toggle('selected_sidebar')
})
// end