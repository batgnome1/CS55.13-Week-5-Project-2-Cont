import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');


function makeJsonObj () {
    const filePath = path.join(dataDir, 'posts.json');
    const jsonString = fs.readFileSync(filePath, 'utf8');
    const jsonObj = JSON.parse(jsonString);
    return jsonObj;
}
export function getSortedPostsData() {

 /*   const filePath = path.join(dataDir, 'posts.json');
    const jsonString = fs.readFileSync(filePath, 'utf8');
    const jsonObj = JSON.parse(jsonString); */
    const jsonObj = makeJsonObj();
    jsonObj.sort(function (a, b) 
        {
            return a.title.localeCompare(b.title);
        }
    );

    return jsonObj.map(item => {
            return {
                id: item.id.toString(),
                title: item.title,
                date: item.date,
                tags: item.tags
            }
        }
    )
}

export function getAllPostIds() {
    const jsonObj = makeJsonObj();
    return jsonObj.map(item => 
        {
            return {
                params: {
                    id: item.id.toString()
                }
            }
        }
    );
}

export function getPostData(id) {
    const jsonObj = makeJsonObj();
    const objReturned = jsonObj.filter(obj => 
        {
            return obj.id.toString() === id;
        }
    );
    if (objReturned.length === 0)  
            {
                return {
                    id: 'id',
                    title: 'error',
                    date: 'error',
                    contenHtml: "<p><strong>>:(</strong></p>",
                    tags: 'loser'
                };
            }
    else {
        return objReturned[0];
    }
}