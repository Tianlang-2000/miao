 class Vector {
    constructor(x, y) {
      this.x = x
      this.y = y
    }
    plus(v) {
      var x = this.x + v.x
      var y = this.y + v.y
      return new Vector (x, y)
    }
    minus(v) {
      var x = this.x - v.x
      var y = this.y - v.y
      return new Vector (x, y)
    }
    get length() {
      return Math.sqrt(this.x * this.x + this.y * this.y)
    }
  }


  var a = new Vector(1,2)
  var b = new Vector(4,5)
  var c = a.plus(b) //  new Vector(5, 7)
  console.log(c.x) // 5
  console.log(c.y) // 7
  console.log(c.length) // results in Math.sqrt(5*5+7*7)




  // Complex类表示一个复数
  // 它有两个属性，real和imag分别表示实部和虚部
  class Complex {
    constructor(real, imag) {
      this.real = real
      this.imag = imag
    }
    plus(c) {
      var real = this.real + c.real
      var imag = this.imag + c.imag
      return new Complex(real, imag)
    }
    minus(c) {
      var real = this.real - c.real
      var imag = this.imag - c.imag
      return new Complex(real, imag)
    }
    mul(c) {
      var real = this.real * c.real - this.imag * c.imag
      var imag = this.real * c.imag + this.imag * c.real
      return new Complex(real, imag) 
    }
    div(c) {
      var helper = new Complex(c.real, -c.imag)
      var up = this.mul(helper)
      var down = c.mul(helper)
      var real = up.real / down.real
      var imag = up.imag / down.real
      return new Complex(real, imag)
    }
    toString() {
      return "(" + this.real + (this.imag >= 0 ? '+' : '') + this.imag + 'i)'
    }
  }


  var d = new Complex(1,2) // 1+2i
  var e = new Complex(3, -4) // 3-4i

  var f = d.plus(e) // 4-2i
  var g = e.mul(f) // 4-22i
  console.log(g.real) // 4
  console.log(g.imag) // -22


  // 实现一个类似js中Array的类型
  // 即长度可变的数组
  // 实现过程中只能通过new Array(n)创建出固定长度的数组
  // 此后再也不能修改这个数组的长度
  //    如push，pop，shift，unshift，修改length，给length及以上的下标赋值
  class ArrayList {

    constructor(init = 8) {
      this.n = init
      this.vals = new Array(n)
      this.length = 0
    }
    // 返回第idx位置的值
    at(idx) {
      if (idx > -this.length - 1 && idx < this.length) {
        if(idx < 0) {
          return this.vals[-idx - 1]
        }
        if(idx >= 0) {
          return this.vals[idx]
        }
      }
      return undefined
    }
    push(val) {
      if (this.length == this.n) {
        this.n *= 2
        var newVals = new Array(this.n)
        for (var i = 0; i < this.length; i++) {
          newVals[i] = this.vals[i]
        }
        this.vals = newVals
      }
      this.vals[this.length] = val
      this.length++
    }
    pop() {
      if (this.length == 0) {
        return undefined
      }
      if (this.length <= this.n / 4 && this.n >= 16) {
        this.n = this.n / 2
        var newVals = new Array(this.n)
        for (var i = 0; i < this.length; i++) {
          newVals[i] = this.vals[i]
        }
        this.vals = newVals
      }
      this.length--
      return this.vals[this.length]
    }
    // 返回数组元素的数量
    get length() {
      return this.length
    }
  }


  var h = new ArrayList()

  for (var i = 0; i < 10000; i++) {
    h.push(i)
  }

  console.log(h.at(15)) // 14
  console.log(h.at(80)) // 79
  console.log(h.length) // 100
  console.log(h.pop()) // 99
  console.log(h.length) // 99



  /**
   * 用单向链表实现一个先进先出的队列
   * 
   */

  // class ListNode {
  //   constructor (val = null) {
  //     this.val = val
  //     this.next = null      
  //   }
  //   append(val) {
  //     if (this === null) {
  //       this = new ListNode(val)
  //     }
  //     var current = this.next
  //     while (current.next !== null) {
  //       current = current.next
  //     }
  //     current.next = new ListNode(val)
  //   }
  //   pop(val) {
  //     if(this === null) {
  //       return false
  //     }
  //     const theVal = this.val
  //     this = this.next
  //     return theVal
  //   }
  // }
  class Queue {
    constructor() {
      this._head = null
      this._tail = null
      this._size = 0
    }
    // 将值val放进队列，放进队列的元素会先进先出
    enqueue(val) {
      var node = {val: val, next: null}
      this._size++
      if(this._head == null) {
        this._head = this._tail = node
        return this
      } else {
        this._tail.next = node
        this._tail = node
        return this
      }
    }
    // 返回队头元素，当队列为空时，返回undefined
    dequeue() {
      if (this._head == null) {
        return undefined
      } else {
        this._size--
        if (this._head == this._tail) {
          var head = this._head.val
          this._head == this._tail == null
          return head
        }
        var head = this._head.val
        this._head = this._head.next
        return head
      }
    }
    // 返回但不删除队头元素
    peek() {
      if (this._size == 0) {
        return undefined
      }
      return this._head.val
    }
    // 返回队列的长度
    get size() {
      return this_size
    }
  }


  var q = new Queue()

  q.enqueue(5)
  q.enqueue(6)

  console.log(q.dequeue()) // 5

  q.enqueue(8)
  q.enqueue(9)

  console.log(q.dequeue()) // 6
  console.log(q.dequeue()) // 8
  console.log(q.size) // 1



  // 表达一个“集合”
  // 即元素不重复的合集
  class MySet {
    constructor() {
      this.vals = []
      this.size = 0
    }
    // 往集合中增加一个元素，但元素如果已经在集合里，则不用增加了
    add(val) {
      for (var i = 0; i < this.size; i++) {
        if (this.vals[i] === val) {
          return
        }
      }
      this.vals.push(val)
      this.size++
      return this
    }
    // 判断集合中是否有val
    has(val) {
      for (var i = 0; i < this.size; i++) {
        if (this.vals[i] === val) {
          return true
        }
      }
      return false
    }
    // 从集合中删除val
    delete(val) {
      for (var i = 0; i < this.size; i++) {
        if (this.vals[i] === val) {
          this.vals.splice(i, 1)
          break
        }
      }
      this.size--
      return false
    }
    // 清空集合中的元素
    clear() {
      this.vals = []
      this.size = 0
      return this
    }
    // 返回集合中元素的数量
    get size() {
      return this.size
    }
  }

  var s = new MySet() 
  s.add(1)
  s.add(1)
  s.size // 1
  s.add(2)
  s.size // 2
  s.delete(1)
  s.size // 1
  s.has(2) // true
  s.has(1) // false
  

   // 表达一个映射
  // 每组映射有一个key和一个value确定
  // 增删改查：
  // 实现过程中不能将对象做为映射来使用（意思是不能使用对象“随意增减属性”的功能）
  class MyMap {

    constructor() {
      this._vals = []
      this._keys = []
      this._size = 0
    }
    // 把key的值设置为val
    // 如果存在key，将其值由旧的映射为新的
    // 如果不存在key，则新增这一组映射
    set(key, val) {     //   obj[key] = val
      for (var i = 0; i < this._size; i++) {
        if (key == this._keys[i]) {
          this._vals[i] = val
        }
      }
      this._keys.push(key)
      this._vals.push(val)
      this._size++  
    }
    // 获取key的映射目标    obj[key]
    get(key) {
      for (var i = 0; i < this._size;i++) {
        if(this._keys[i] == key) {
          return this._vals[i]
        }
      }
      return undefined
    }
    // 判断当前map中是否存在key     key in obj
    has(key) {
      for (var i = 0; i < this._size;i++) {
        if(this._keys[i] == key) {
          return true
        }
      }
      return false
    }
    // 删除key对应的映射对
    delete(key) {   //    delete   obj[key]
      for (var i = 0; i < this._size; i++) {
        if(this._keys[i] == key) {
          this._keys.splice(i, 1)
          this._vals.splice(i, 1)
          this_size--
        }
      }
      return false
    }
    // 返回当前map中映射对的数量
    get size() {
      return this._size
    }
    clear() {
      this._vals = []
      this._keys = []
      this._size = 0
    }
  }
