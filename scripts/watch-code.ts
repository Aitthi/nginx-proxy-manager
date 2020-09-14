
import { startService } from 'esbuild'
import { watch } from 'chokidar'

const build = async () =>{
    const service = await startService()
    try{
        const startTime = Date.now();
        await service.build({
            entryPoints: ['./src/main.ts'],
            outfile: './dist/main.js',
            minify: true,
            bundle: true,
            platform: 'node'
        })
        const endTime = Date.now();
        console.log(`Built in ${endTime - startTime}ms`)
    }catch(err){
        console.log(err.stack)
    }finally{
        service.stop()
    }
}

const watcher = watch(["src/**/*"]);
console.log('Watching files... \n')
build()
watcher.on("change", ()=>{
build()
})