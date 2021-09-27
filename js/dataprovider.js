

const listProduct = document.getElementById('product-list')
localStorage.setItem('isPagination',0)
localStorage.setItem('next','https://aplicaion-clothing-api.herokuapp.com/api/v1/provider/')



function onSetItem() {

  /*
    Se encarga de añadir
    los items en la pantalla
  */

  fetch(localStorage.getItem('next'))
    .then(res => res.json())
    .then(res => {
      
      if(res.next == null) {
        localStorage.setItem('isPagination',1)
      } else {
        localStorage.setItem('next',res.next)        
        localStorage.setItem('isPagination',0)
      }

      for(var x = 0;x<=res.results.length;x++) {
        if(res.results[x] != undefined) {
          listProduct.innerHTML += `<a target="_blank" href="${res.results[x].origin}">
            <div class="product-item">
            <div id="image-picture-${res.results[x].id}"></div>
            <div class="meta-info">
              ${x}
              <div id="title-container">
                <strong id="title">${res.results[x].title}</strong>
              </div>
              <div>
                <strong id="price">$ ${res.results[x].proce}</strong>
              </div>
            </div>
          </div>
          </a>`

          var el = document.getElementById(`image-picture-${res.results[x].id}`)
          el.style.width = '200px'
          el.style.backgroundPosition = 'center'
          el.style.background = 'white'
          el.style.backgroundSize = 'contain'
          el.style.backgroundImage = `url(${res.results[x].picture})`
          el.style.backgroundRepeat = 'no-repeat'
          el.style.borderRadius = '6px'

        }
      }
      

    })
    .catch(err => {
      console.log(err)
    })
    .catch(err => {
      console.log(err)
    })
}




function onPagination() {

  /*
    Se encarga de paginar los
    datos con un scroll infinito
  */

  window.addEventListener('scroll',(e) => {
    let scrollHeight = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    )

    if(pageYOffset >= (scrollHeight - 1000)) {
      if(localStorage.getItem('isPagination') == 0){
        localStorage.setItem('isPagination',1)
        onSetItem()
      }
    }

    
  })
}




onSetItem()
onPagination()







