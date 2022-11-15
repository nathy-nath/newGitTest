// import views
import homeView from './views/pages/home'
import fourOFourView from './views/pages/404'
import signinView from './views/pages/signin'
import signupView from './views/pages/signup'
import profileView from './views/pages/profile'
import editProfileView from './views/pages/editProfile'
// import testView from './views/pages/test'
import guideView from './views/pages/guide'
// import hairdressersView from './views/pages/hairdressers'
// import haircutsView from './views/pages/haircuts'
import favouriteServicesView from './views/pages/favouriteService'
import referencesView from './views/pages/references'
// import newHaircutView from './views/pages/newHaircut'
import servicesView from './views/pages/services'
import newServiceView from './views/pages/newService'
// import detailingView from './views/pages/detailing'
// import mechanicalView from './views/pages/mechanical'
// import fourXView from './views/pages/4x4'
// import restorationView from './views/pages/restoration'
// import windscreenView from './views/pages/windscreen'
// import electricalView from './views/pages/electrical'
// import emergencyView from './views/pages/emergency'
// import paintPanelView from './views/pages/paint-panel'

// define routes
const routes = {
	'/': homeView,	
	'404' : fourOFourView,
	'/signin': signinView,
	'/signup': signupView,
	'/profile': profileView,
	'/editProfile': editProfileView,
	// '/test': testView,
	'/guide': guideView,
	// '/hairdressers': hairdressersView,
	// '/haircuts': haircutsView,
	'/favouriteServices': favouriteServicesView,
	'/references': referencesView,
	// '/newHaircut': newHaircutView,
	'/newService': newServiceView,
	'/services': servicesView,
// 	'/categories/detailing': detailingView,
// 	'/categories/mechanical': mechanicalView,
// 	'/categories/4x4': fourXView,	
// 	'/categories/restoration': restorationView,	
// 	'/categories/windscreen': windscreenView,	
// 	'/categories/electrical': electricalView,	
// 	'/categories/emergency': emergencyView,
// 	'/categories/paint&panel': paintPanelView,
}

class Router {
	constructor(){
		this.routes = routes
	}
	
	init(){
		// initial call
		this.route(window.location.pathname)

		// on back/forward
		window.addEventListener('popstate', () => {
			this.route(window.location.pathname)
		})
	}
	
	route(fullPathname){
		// extract path without params
		const pathname = fullPathname.split('?')[0]
		const route = this.routes[pathname]
		
		if(route){
			// if route exists, run init() of the view
			this.routes[window.location.pathname].init()
		}else{			
			// show 404 view instead
			this.routes['404'].init()			
		}
	}

	gotoRoute(pathname){
		window.history.pushState({}, pathname, window.location.origin + pathname);
		this.route(pathname)
	}	
}

// create appRouter instance and export
const AppRouter = new Router()
export default AppRouter


// programmatically load any route
export function gotoRoute(pathname){
	AppRouter.gotoRoute(pathname)
}


// allows anchor <a> links to load routes
export function anchorRoute(e){
	e.preventDefault()	
	const pathname = e.target.closest('a').pathname
	AppRouter.gotoRoute(pathname)
}
