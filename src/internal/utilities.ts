import {__UNSAFE_DATA, BaseModel} from "./types";
import {runThread} from "../threads/runThread";

/**
 *
 * Main method, which define routes for express application
 * It's loop through a controllers which should be specified inside root file
 *
 */
export function useAllRoutes(app: any, controllers: Array<any>, apiStartURL: string | null) {
    if (controllers === void 0 || controllers === null) {
        throw new Error('Error corrupted on controllers installing!')
    }
    controllers.forEach(async function (controller) {
        const controllerImpl = new controller();
        const router = controllerImpl.router;
        for (let key of Object.getOwnPropertyNames(controller.prototype)) {
            const field = controllerImpl[key];
            if (typeof field === 'function' && key !== 'constructor') {
                const group = controller.prototype.__unsafe__group;
                const data: __UNSAFE_DATA = field.__unsafe_data
                router[data.method || 'get'](`${apiStartURL !== void 0 || apiStartURL !== null ? apiStartURL : ""}/${group || 'api'}${data.path || 'default'}`, ...data.middlewares , data.__unsafe__dto, data.__unsafe__tokens, (request, response) => {
                    field.apply(controllerImpl, [request, response])
                })
            }
        }
        app.use(controllerImpl.router)
    })
}

/**
 *
 * Using for sync all database models
 * It's loop through a models which should be specified inside root file
 *
 */


const sleep = (timer: number = 1000) => new Promise((resolve) => setTimeout(resolve, timer))


/**
 *
 * Using for multithreading (worker_threads) inside node js application
 * It's loop through a function which should be specified inside root file
 *
 */
let thread = 5;
export async function useAllThreads(paths: Array<{path: string; data: any}>) {
  try {
      if (paths.length === 0) {
          return;
      }
      for (let i = 0; i <= thread; i++) {
          await runThread(paths[i].path, paths[i].data)
      }
  } catch (e) {
      console.log('On useAllThreads ex', e)
  }
}
