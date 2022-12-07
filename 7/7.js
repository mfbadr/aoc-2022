const inputs = require('./input')
const testOutput = 95437;

// create an object, where keys are dir name
// each dir can have other dirs or a files arr file sizes

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

console.log(root)
console.log(root.size)

const finalSum = root
  .getAllDirectories()
  .map(i => i.size)
  .filter(i => i<=100000)
  .reduce((acc, curr) => { return acc + curr}, 0)

console.log(`Final sum is ${finalSum}`)
// console.log(root.getAllDirectories())

// start at root
// looop through _subdirs





