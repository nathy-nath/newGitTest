import { LitElement, html, css } from '@polymer/lit-element'
import { render } from 'lit-html'
import {anchorRoute, gotoRoute} from '../Router'
import Auth from '../Auth'
import App from '../App'

// creating a new custom element (call it whatever you like - 
// here <na-category></na-category>)
customElements.define('na-category', class Category extends LitElement {
  constructor(){
    super()    
  }

  static get properties(){
    return {
      name: {
        type: String
      },
      description: {
        type: String
      },
      user: {
        type: Object
      },
      image: {
        type: String
      }           
    }
  }

  // firstUpdated(){
  //   super.firstUpdated()
  // }

  testHandler(){
    alert("test")
  }

 goToHandler(){
    //alert("More info...")

    // create a route to the page
    

    // - create sl-dialog
    const dialogEl = document.createElement('sl-dialog')

    //add class name 
    dialogEl.className = 'category-dialog'

    // sl-dialog content
    const dialogContent = html`
    <style>
        .wrap {
        display: flex;
        }
        .image {
        width: 50%;
        }
        .image img {
        width: 100%;
        }
        .content {
        padding-left: 1em;
        }
        
    </style>
    <div class="wrap">
        <div class="image">
            <img src="${App.apiBase}/images/${this.image}" alt="${this.name}" />
        </div>
        <div class="content">
            <h1>${this.name}</h1>
            <p>${this.description}</p>
  
            <sl-button @click=${this.addFavHandler.bind(this)}>
                <sl-icon slot="prefix" name="heart-fill"></sl-icon>
                Add to Favourites
            </sl-button>
        </div>
    </div>
  `
    render(dialogContent, dialogEl)


    
    // - append to doc body
    document.body.append(dialogEl)

    // - show sl-dialog
    dialogEl.show()
    //onHide delete sl-dialog
    dialogEl.addEventListener('sl-after-hide', () => {
        dialogEl.remove()
    })

  }

  addFavHandler(){
    alert("Add to favorites...")
  }
  
  render(){    
    const page=this.name.toLowerCase()
    return html`
    
    <style>
        .author {
            font-size: 0.9em;
            font-style: italic;
            opacity: 0.8;
        }
    </style>
   
    <sl-card>
        <img slot="image" src="${App.apiBase}/images/${this.image}"/>
        <h2>${this.name}</h2>
        
        <sl-button class="anim-in" @click=${() => gotoRoute('/categories/'+page)}>Start</sl-button>
        
    </sl-card>

  
    `
  }
  
})