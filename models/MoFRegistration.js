const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const mofSchema = mongoose.Schema({
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
    f2: {
      caption: {
        type: 'String'
      },
      value: {
        type: 'String'
      }
    },
    f3: {
      caption: {
        type: 'String'
      },
      value: {
        type: 'String'
      }
    }
  },
  s2: {
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
    f2: {
      caption: {
        type: 'String'
      },
      value: {
        type: 'String'
      }
    },
    f3: {
      caption: {
        type: 'String'
      },
      value: {
        type: 'String'
      }
    },
    f4: {
      caption: {
        type: 'String'
      },
      value: {
        type: 'String'
      }
    },
    f5: {
      caption: {
        type: 'String'
      },
      value: {
        type: 'String'
      }
    },
    f6: {
      caption: {
        type: 'String'
      },
      value: {
        type: 'String'
      }
    },
    f7: {
      caption: {
        type: 'String'
      },
      value: {
        type: 'String'
      }
    },
    f8: {
      caption: {
        type: 'String'
      },
      value: {
        type: 'String'
      }
    },
    f9: {
      caption: {
        type: 'String'
      },
      value: {
        type: 'String'
      }
    },
    f10: {
      caption: {
        type: 'String'
      },
      value: {
        type: 'String'
      }
    },
    f11: {
      caption: {
        type: 'String'
      },
      value: {
        type: 'String'
      }
    },
    f12: {
      caption: {
        type: 'String'
      },
      value: {
        type: 'String'
      }
    },
    f13: {
      caption: {
        type: 'String'
      },
      value: {
        type: 'String'
      }
    }
  },
  s3: {
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
    f2: {
      caption: {
        type: 'String'
      },
      value: {
        type: 'String'
      }
    },
    f3: {
      caption: {
        type: 'String'
      },
      value: {
        type: 'String'
      }
    },
    f4: {
      caption: {
        type: 'String'
      },
      value: {
        type: 'String'
      }
    },
    f5: {
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
  "original": {
    "type": "String"
  },
  "download": {
    "type": "String"
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
mofSchema.pre("save", function (next) {
  now = new Date();
  this.updated_at = now;
  if (!this.created_at) {
    this.created_at = now;
  }
  next();
});

const MoF = mongoose.model('MoFRegistration', mofSchema)

module.exports = MoF
