import {Worker} from "worker_threads";


export function runThread(path: string, workerData: any) {
    return new Promise((resolve, reject) => {
        const worker = new Worker(path, {workerData: workerData, })
        worker.on('message', resolve)
        worker.on('error', reject)
        worker.on('exit', (code) => {
            console.log('EXIT CODE', code)
        })
    })
}