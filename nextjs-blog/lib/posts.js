import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
    // ファイル名の取得
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames.map(fileName => {
        // '.md'をファイル名から削除
        const id = fileName.replace(/\.md$/, '')

        // マークダウンファイルを文字列として取得
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')

        // gray-matterを使ってtitle、dateのようなmetadata部分を解析
        const matterResult = matter(fileContents)

        // dataをidと組み合わせる
        return {
            id,
            ...matterResult.data
        }
    })

    // 日付順に並べ替え
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1
        } else {
            return -1
        }
    })
}

// postsディレクトリ内のファイル名のリストを返す
export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory)

    return fileNames.map(fileName => {
        return {
            params: {
                id: fileName.replace(/\.md$/, '')
            }
        }
    })
}

export function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${ id }.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // gray-matterを用いて、metadataセクションを解析
    const matterResult = matter(fileContents)

    // idと共にdataを組み合わせる
    return {
        id,
        ...matterResult.data
    }
}