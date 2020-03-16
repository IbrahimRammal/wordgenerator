const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const emptySchema = mongoose.Schema({
  type: {
    type: 'String'
  },
  client: {
    id: {
      type: 'String'
    },
    email: {
      type: 'String'
    },
    name: {
      type: 'String'
    }
  },
  createuser: {
    id: {
      type: 'String'
    },
    email: {
      type: 'String'
    },
    name: {
      type: 'String'
    }
  },
  modifieduser: {
    id: {
      type: 'String'
    },
    email: {
      type: 'String'
    },
    name: {
      type: 'String'
    }
  },
  s1: {
    caption: {
      type: 'String'
    },
    f0: {
      caption: {
        type: 'String'
      },
      value: {
        type: 'String'
      }
    }
  },
  date: {
    type: 'String'
  },
  caption: {
    type: 'String'
  },
  leftheader: {
    title: {
      type: 'String'
    },
    defulat: {
      type: 'String'
    },
    value: {
      type: 'String'
    },
    style: {
      type: 'String'
    }
  },
  centerheader: {
    title: {
      type: 'String'
    },
    defulat: {
      type: 'String'
    },
    value: {
      type: 'String'
    },
    style: {
      type: 'String'
    }
  },
  rightheader: {
    title: {
      type: 'String'
    },
    defulat: {
      type: 'String'
    },
    value: {
      type: 'String'
    },
    style: {
      type: 'String'
    }
  },
  centerfooter: {
    title: {
      type: 'String'
    },
    defulat: {
      type: 'String'
    },
    value: {
      type: 'String'
    },
    style: {
      type: 'String'
    }
  }
})

const ETemplate = mongoose.model('EmptyTemplate', emptySchema)

module.exports = ETemplate
