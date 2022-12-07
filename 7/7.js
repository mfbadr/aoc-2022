const inputs = require('./input')
const testOutput = 95437;

class Directory {
  constructor(parent, name) {
    this._files = [];
    this._subDirs = {};
    this._parent = parent
    this._name = name || 'dir'
  }

  getAllDirectories() {
    const allDirs = [this];
    Object.values(this._subDirs).forEach(subDir => {
      allDirs.push(...subDir.getAllDirectories())
    });
    return allDirs
  }

  get size(){
    return this.fileSize + this.subDirSize
  }
  get subDirSize(){
    return Object.values(this._subDirs).reduce((acc, curr) => {return acc + parseInt(curr.size)}, 0)
  }

  get subdirList() {
    return Object.values(this._subDirs);
  }

  get fileSize(){
    return this._files.reduce((acc, curr) => {return acc + parseInt(curr)}, 0)
  }

  addDir(name){
    const newDir = new Directory(this, name); 
    this._subDirs[name] = newDir
  }

  addFile(size){
    this._files.push(size)
  }

}

let root = new Directory(null, 'root');

const inputSplit = inputs.real.split(/\n/);
let cwd = root;

inputSplit.forEach((input, index) => {
  if(index === 0) {
    return
  }

  if(input === '$ ls') {
    return
  }

  if(input.match(/\d+/)) {
    cwd.addFile(input.match(/\d+/)[0])
    return
  }

  if(input.startsWith('dir')) {
    const newDirName = input.split(' ')[1];
    cwd.addDir(newDirName)
    return
  }

  if(input.startsWith('$ cd')){
    const arg = input.split(' ')[2];
    if(arg === '..') {
      cwd = cwd._parent
    } else {
      cwd = cwd._subDirs[arg]
    }
    return
  }

})



const allDirSizes = root
  .getAllDirectories()
  .map(i => i.size)
const partOneSum = allDirSizes
  .filter(i => i<=100000)
  .reduce((acc, curr) => { return acc + curr}, 0)

console.log(`Part One sum ${partOneSum}`)

// part 2: Find smallest directory that, when deleted would free up 30000000

const freeSpace = 70000000 - root.size;

const spaceNeeded = 30000000 - freeSpace

const partTwo = allDirSizes
  .filter(i => i>spaceNeeded)
  .sort((a, b) => a - b)

  console.log(partTwo)

console.log(`Part Two answer is ${partTwo[0]}`)