import gsap from 'gsap'

class Utils {

  isMobile(){
    let viewportWidth = window.innerWidth
    if(viewportWidth <= 768){
      return true
    }else{
      return false
    }
  }


  pageIntroAnim(){
    const pageContent = document.querySelector('.page-content')
    if(!pageContent) return
    gsap.fromTo(pageContent, {opacity: 0, y: -12}, {opacity: 1, y: 0, ease: 'power2.out', duration: 0.3})
  }
}

// export function truncate(string, limit) {
//   string = string.replace(/(\r\n|\n|\r)/gm,"")
//   let truncatedString = string.split(" ").splice(0, limit).join(" ")
//   truncatedString += ' ...'
//   return truncatedString
// }


export default new Utils()