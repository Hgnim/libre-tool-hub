const logHeader='[createDoorPage.js] ';

import fs from 'fs';
import path from 'path';

import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));


const outputDir = path.resolve(__dirname, '../../src/static/_door');


if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log(`${logHeader}'${outputDir}'输出目录不存在，已创建`);
}else console.log(`${logHeader}'${outputDir}'输出目录存在`);

const template = fs.readFileSync(path.resolve(__dirname,'./template.html'), 'utf-8');
const dataJson=JSON.parse(fs.readFileSync(path.resolve(__dirname,'./data.json'), 'utf-8'));

dataJson.forEach((item) => {
    if (item.dir===undefined){
        let writeContent = template;
        writeContent=writeContent.replace('[[[title]]]',item.content.title);
        writeContent=writeContent.replace('[[[href]]]',item.content.href);
        writeContent=writeContent.replace('[[[body]]]',item.content.body);
        const outputFilePath=path.resolve(outputDir,item.path);
        fs.writeFileSync(outputFilePath, writeContent, 'utf8');
        console.log(`${logHeader}输出文件：'${outputFilePath}'`);
    }else{
        const dirPath=path.resolve(outputDir,item.dir);
        if (!fs.existsSync(dirPath)){
            fs.mkdirSync(dirPath, { recursive: true });
            console.log(`${logHeader}创建目录：'${dirPath}'`);
        }
        else console.log(`${logHeader}目录存在：'${dirPath}'`);
    }
})
