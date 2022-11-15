import { LitElement, html, css } from '@polymer/lit-element'
import { render } from 'lit-html'
import {anchorRoute, gotoRoute} from '../Router'
import Auth from '../Auth'
import App from '../App'

customElements.define('na-mechanical', class Mechanical extends LitElement {
  constructor(){
    super()    
  }

  static get properties(){
    return {
      name: {
        type: String
      },
      category: {
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

//   firstUpdated(){
//     super.firstUpdated()
//   }

  testHandler(){
    alert("test")
  }

  

  moreInfoHandler(){
    //alert("More info...")

    // - create sl-dialog
    const dialogEl = document.createElement('sl-dialog')

    //add class name 
    dialogEl.className = 'service-dialog'

    // sl-dialog content (of the 'more info' card)
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
        h1 {
          color: #1d3557;
        }
        h3 {
            font-size: 1.5em;
            color: var(--brand-color);
            text-transform: uppercase;
            font-weight: bold;
        }
    </style>
    <div class="wrap">
        <div class="image">
            <img src="${App.apiBase}/images/${this.image}" alt="${this.name}" />
        </div>
        <div class="content">
            <h1>${this.name}</h1>
            <h3>${this.category}</h3>
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

  // trying to truncate the descritption to fit on a service card
  // currently not functioning

  // desc = utils.truncate(this.description, 5)
  
  
  render(){    
    return html`
    <style>
        .author {
            font-size: 0.9em;
            font-style: italic;
            opacity: 0.8;
        }
        h1 {
          color: var(--brand-color);
          text-transform: uppercase;
          font-weight: bold;
        }
        p {
          width: 10em;
        }
    </style>

    <sl-card>
      
      <img style="width: 100%; object-fit: cover" slot="image" src="${App.apiBase}/images/${this.image}"/>
      
      <h2>${this.name}</h2>
      <h1>${this.category}</h1>
      <p>${this.description.slice(0,30)}...</p>
      <p class="author">By ${this.user.firstName} ${this.user.lastName}</p>
      <sl-button @click=${this.moreInfoHandler.bind(this)}>More info</sl-button>
      <sl-icon-button name="heart-fill" label="Add to Favourites" 
      @click=${this.addFavHandler.bind(this)}></sl-icon-button>
    </sl-card>

  
    `
  }
  
})