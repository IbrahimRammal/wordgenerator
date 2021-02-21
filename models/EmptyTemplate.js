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
    f1: {
      caption: {
        type: 'String'
      },
      value: {
        type: 'String'
      }
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
  },
  user_created: {type: 'String'},
  user_edit: {type: 'String'},
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
    note: {type: 'String'},
  docArray: {type: 'Object'}
  //   payment : [subPayment]
});

// Sets the created_at parameter equal to the current time
emptySchema.pre("save", function (next) {
  now = new Date();
  this.updated_at = now;
  if (!this.created_at) {
    this.created_at = now;
  }
  next();
});

const ETemplate = mongoose.model('EmptyTemplate', emptySchema)

module.exports = ETemplate
