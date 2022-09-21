let h1 = document.createElement('h1')
h1.innerText = 'Dictionary'
h1.setAttribute('id', 'title')
h1.classList.add("text-center")
document.body.appendChild(h1)

let main = document.createElement('div')
main.classList.add("container")
document.body.appendChild(main)

let input = document.createElement('input')
input.classList.add('mx-auto', 'd-block', 'form-control', 'w-75')
input.setAttribute('id', 'input')
input.setAttribute('placeholder', 'Enter a word to search')

//for search the Word

let btn = document.createElement('button')
btn.classList.add('mx-auto', 'd-block', 'btn', 'btn-success', 'm-3', 'px-4')
btn.setAttribute('id', 'btn')
btn.innerHTML = "Search"
main.appendChild(input)
main.appendChild(btn)
let row = document.createElement('div')
row.classList.add('row', 'm-2')
main.appendChild(row)

document.getElementById('btn').addEventListener('click', () => {
    let val = document.getElementById('input').value
    //fetching the description of words from Dictionary Api
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${val}`)
        .then((d) => d.json())
        .then((data) => {
            // console.log(data);
            let col = document.createElement('div')
            col.classList.add('column', 'm-1', 'mx-auto', 'rounded-2', 'col-xl-6', 'col-lg-6', 'col-md-8', 'col-sm-10', 'border', 'px-4', 'py-4')
            row.appendChild(col)
            let head = document.createElement('div')
            head.classList.add('text-center', 'h3')
            head.innerHTML = `${data[0].word.toUpperCase()}`
            col.appendChild(head)

            let mean = data[0].meanings.length
            for (let i = 0; i < mean; i++) {
                let div1 = document.createElement('div')
                div1.innerHTML = `Part Of Speech:<b> ${data[0].meanings[i].partOfSpeech}</b>`
                let def = document.createElement('div')

                let def_len = (data[0].meanings[i].definitions).length
                if (def_len >= 0 && def_len <= 4) {
                    for (let k = 0; k < def_len; k++) {
                        let sub_div = document.createElement('div')
                        sub_div.innerHTML = `-${data[0].meanings[i].definitions[k].definition}<br>`
                        div1.appendChild(sub_div)
                    }
                }
                if (def_len >= 5) {
                    for (let j = 0; j < 5; j++) {
                        let sub_div = document.createElement('div')
                        sub_div.innerHTML = `-${data[0].meanings[i].definitions[j].definition}<br>`
                        div1.appendChild(sub_div)
                    }
                }
                col.appendChild(div1)
                div1.appendChild(def)
            }

            //For Knowing synonyms
            let s_btn = document.createElement('button')
            s_btn.innerHTML = "Click here to See Synonyms &#8595;"
            s_btn.classList.add('btn', 'btn-light', 'm-2', 'border-0')
            s_btn.setAttribute('id', 's_btn')
            col.appendChild(s_btn)
            let sys = document.createElement('div')
            sys.setAttribute('id', 's_box')
            sys.classList.add('text-center', 'p-2', 's_box')
            let ff = data[0].meanings[0].definitions[0].synonyms
            let sys_div = document.createElement('div')
            sys.appendChild(sys_div)
            col.appendChild(sys)
            if (ff != 0) {
                for (let i = 0; i < ff.length; i++) {
                    let span = document.createElement('span')
                    span.classList.add('word')
                    span.innerHTML = `${ff[i]},`
                    sys_div.appendChild(span)

                }
            }
            else {
                document.getElementById('s_box').innerHTML = (`Synonyms Not available for "${data[0].word}"`)
            }
            document.getElementById('s_btn').addEventListener('click', () => {
                let x = document.getElementById('s_box');
                if (x.style.display == "none") {
                    x.style.display = "block"
                    document.getElementById('s_btn').style.backgroundColor = "#c8ecf2"

                }
                else {
                    x.style.display = "none"

                }
            })
            //CLICK for antonyms
            let fff = data[0].meanings[0].definitions[0].antonyms
            let a_btn = document.createElement('button')
            a_btn.innerHTML = "Click here to See Antonyms &#8595;"
            a_btn.classList.add('btn', 'btn-light', 'm-2', 'border-0')
            a_btn.setAttribute('id', 'a_btn')
            col.appendChild(a_btn)
            let ant = document.createElement('div')
            ant.setAttribute('id', 'a_box')
            ant.classList.add('text-center', 'p-2', 'a_box')
            col.appendChild(ant)
            let ant_div = document.createElement('div')
            ant.appendChild(ant_div)
            if (fff != 0) {
                for (let i = 0; i < fff.length; i++) {
                    let span = document.createElement('span')
                    span.classList.add('word')
                    span.innerHTML = `${fff[i]},`
                    sys_div.appendChild(span)
                }
            }
            else {
                document.getElementById('a_box').innerHTML = (`Antonyms Not available for "${data[0].word}"`)
            }
            document.getElementById('a_btn').addEventListener('click', () => {
                let y = document.getElementById('a_box');
                if (y.style.display == "none") {
                    y.style.display = "block"
                    document.getElementById('a_btn').style.backgroundColor = "#c8ecf2"

                }
                else {
                    y.style.display = "none"

                }
            })
        })
        .catch((er) => {
            console.log('Error');
        })
})