const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const birthSchema = mongoose.Schema({
  "type": {
    "type": "String"
  },
  "client": {
    "id": {
      "type": "String"
    },
    "email": {
      "type": "String"
    },
    "name": {
      "type": "String"
    }
  },
  "createuser": {
    "id": {
      "type": "String"
    },
    "email": {
      "type": "String"
    },
    "name": {
      "type": "String"
    }
  },
  "modifieduser": {
    "id": {
      "type": "String"
    },
    "email": {
      "type": "String"
    },
    "name": {
      "type": "String"
    }
  },
  "s0": {
    "name": {
      "type": "String"
    },
    "surname": {
      "type": "String"
    },
    "father": {
      "type": "String"
    },
    "mother": {
      "type": "String"
    },
    "mothersurname": {
      "type": "String"
    },
    "nationaltiy": {
      "type": "String"
    },
    "sex": {
      "type": "String"
    },
    "familystatus": {
      "type": "String"
    },
    "governorate": {
      "type": "String"
    },
    "district": {
      "type": "String"
    },
    "city": {
      "type": "String"
    },
    "quarter": {
      "type": "String"
    },
    "street": {
      "type": "String"
    },
    "building": {
      "type": "String"
    },
    "floor": {
      "type": "String"
    },
    "mobile": {
      "type": "String"
    },
    "work": {
      "type": "String"
    },
    "fax": {
      "type": "String"
    },
    "email": {
      "type": "String"
    },
    "profession": {
      "type": "String"
    },
    "address": {
      "type": "String"
    },
    "telephone": {
      "type": "String"
    },
    "religion": {
      "type": "String"
    },
    "placeofbirthlocal": {
      "type": "String"
    },
    "placeofbirthdistrict": {
      "type": "String"
    },
    "dateofbirth": {
      "type": "String"
    },
    "placeregistry": {
      "type": "String"
    },
    "noregistry": {
      "type": "String"
    }
  },
  "s1": {
    "caption": {
      "type": "String"
    },
    "f1": {
      "caption": {
        "type": "String"
      },
      "value": {
        "type": "String"
      }
    },
    "f2": {
      "caption": {
        "type": "String"
      },
      "value": {
        "type": "String"
      }
    },
    "f3": {
      "caption": {
        "type": "String"
      },
      "s1": {
        "caption": {
          "type": "String"
        },
        "value": {
          "type": "String"
        }
      },
      "s2": {
        "caption": {
          "type": "String"
        },
        "value": {
          "type": "String"
        }
      },
      "s3": {
        "caption": {
          "type": "String"
        },
        "value": {
          "type": "String"
        }
      }
    },
    "f4": {
      "caption": {
        "type": "String"
      },
      "value": {
        "type": "String"
      }
    },
    "f5": {
      "caption": {
        "type": "String"
      },
      "s1": {
        "caption": {
          "type": "String"
        },
        "value": {
          "type": "String"
        }
      },
      "s2": {
        "caption": {
          "type": "String"
        },
        "value": {
          "type": "String"
        }
      },
      "s3": {
        "caption": {
          "type": "String"
        },
        "value": {
          "type": "String"
        }
      },
      "s4": {
        "caption": {
          "type": "String"
        },
        "value": {
          "type": "String"
        }
      },
      "s5": {
        "caption": {
          "type": "String"
        },
        "value": {
          "type": "String"
        }
      }
    }
  },
  "s2": {
    "caption": {
      "type": "String"
    },
    "f1": {
      "caption": {
        "type": "String"
      },
      "s1": {
        "caption": {
          "type": "String"
        },
        "value": {
          "type": "String"
        }
      },
      "s2": {
        "caption": {
          "type": "String"
        },
        "value": {
          "type": "String"
        }
      }
    },
    "f2": {
      "caption": {
        "type": "String"
      },
      "value": {
        "type": "String"
      }
    },
    "f3": {
      "caption": {
        "type": "String"
      },
      "value": {
        "type": "String"
      }
    },
    "f4": {
      "caption": {
        "type": "String"
      },
      "value": {
        "type": "String"
      }
    },
    "f5": {
      "caption": {
        "type": "String"
      },
      "value": {
        "type": "String"
      }
    }
  },
  "s3": {
    "caption": {
      "type": "String"
    },
    "f1": {
      "caption": {
        "type": "String"
      },
      "s1": {
        "caption": {
          "type": "String"
        },
        "value": {
          "type": "String"
        }
      },
      "s2": {
        "caption": {
          "type": "String"
        },
        "value": {
          "type": "String"
        }
      }
    },
    "f2": {
      "caption": {
        "type": "String"
      },
      "value": {
        "type": "String"
      }
    },
    "f3": {
      "caption": {
        "type": "String"
      },
      "value": {
        "type": "String"
      }
    },
    "f4": {
      "caption": {
        "type": "String"
      },
      "value": {
        "type": "String"
      }
    },
    "f5": {
      "caption": {
        "type": "String"
      },
      "value": {
        "type": "String"
      }
    },
    "f6": {
      "caption": {
        "type": "String"
      },
      "value": {
        "type": "String"
      }
    }
  },
  "s4": {
    "caption": {
      "type": "String"
    },
    "f1": {
      "caption": {
        "type": "String"
      },
      "s1": {
        "caption": {
          "type": "String"
        },
        "value": {
          "type": "String"
        }
      },
      "s2": {
        "caption": {
          "type": "String"
        },
        "value": {
          "type": "String"
        }
      }
    },
    "f2": {
      "caption": {
        "type": "String"
      },
      "value": {
        "type": "String"
      }
    },
    "f3": {
      "caption": {
        "type": "String"
      },
      "value": {
        "type": "String"
      }
    },
    "f4": {
      "caption": {
        "type": "String"
      },
      "value": {
        "type": "String"
      }
    }
  },
  "s5": {
    "caption": {
      "type": "String"
    },
    "f1": {
      "caption": {
        "type": "String"
      },
      "value": {
        "type": "String"
      }
    },
    "f2": {
      "caption": {
        "type": "String"
      },
      "value": {
        "type": "String"
      }
    }
  },
  "s6": {
    "caption": {
      "type": "String"
    },
    "f1": {
      "caption": {
        "type": "String"
      },
      "value": {
        "type": "String"
      }
    },
    "f2": {
      "caption": {
        "type": "String"
      },
      "value": {
        "type": "String"
      }
    }
  },
  "s7": {
    "caption": {
      "type": "String"
    },
    "f1": {
      "caption": {
        "type": "String"
      },
      "value": {
        "type": "String"
      }
    },
    "f2": {
      "caption": {
        "type": "String"
      },
      "value": {
        "type": "String"
      }
    },
    "f3": {
      "caption": {
        "type": "String"
      },
      "value": {
        "type": "String"
      }
    },
    "f4": {
      "caption": {
        "type": "String"
      },
      "value": {
        "type": "String"
      }
    },
    "f5": {
      "caption": {
        "type": "String"
      },
      "value": {
        "type": "String"
      }
    }
  },
  "s8": {
    "caption": {
      "type": "String"
    },
    "f1": {
      "caption": {
        "type": "String"
      },
      "value": {
        "type": "String"
      }
    },
    "f2": {
      "caption": {
        "type": "String"
      },
      "value": {
        "type": "String"
      }
    },
    "f3": {
      "caption": {
        "type": "String"
      },
      "value": {
        "type": "String"
      }
    },
    "f4": {
      "caption": {
        "type": "String"
      },
      "value": {
        "type": "String"
      }
    },
    "f5": {
      "caption": {
        "type": "String"
      },
      "value": {
        "type": "String"
      }
    }
  },
  "s9": {
    "caption": {
      "type": "String"
    },
    "f1": {
      "caption": {
        "type": "String"
      },
      "value": {
        "type": "String"
      }
    },
    "f2": {
      "caption": {
        "type": "String"
      },
      "value": {
        "type": "String"
      }
    },
    "f3": {
      "caption": {
        "type": "String"
      },
      "value": {
        "type": "String"
      }
    },
    "f4": {
      "caption": {
        "type": "String"
      },
      "value": {
        "type": "String"
      }
    },
    "f5": {
      "caption": {
        "type": "String"
      },
      "value": {
        "type": "String"
      }
    }
  },
  "s10": {
    "caption": {
      "type": "String"
    },
    "f1": {
      "caption": {
        "type": "String"
      },
      "value": {
        "type": "String"
      }
    },
    "f2": {
      "caption": {
        "type": "String"
      },
      "value": {
        "type": "String"
      }
    }
  },
  "s11": {
    "caption": {
      "type": "String"
    },
    "f1": {
      "caption": {
        "type": "String"
      },
      "value": {
        "type": "String"
      }
    },
    "f2": {
      "caption": {
        "type": "String"
      },
      "value": {
        "type": "String"
      }
    },
    "f3": {
      "caption": {
        "type": "String"
      },
      "value": {
        "type": "String"
      }
    }
  },
  "s12": {
    "caption": {
      "type": "String"
    },
    "f1": {
      "caption": {
        "type": "String"
      },
      "value": {
        "type": "String"
      }
    },
    "f2": {
      "caption": {
        "type": "String"
      },
      "value": {
        "type": "String"
      }
    },
    "f3": {
      "caption": {
        "type": "String"
      },
      "value": {
        "type": "String"
      }
    }
  },
  "s13": {
    "caption": {
      "type": "String"
    },
    "f1": {
      "caption": {
        "type": "String"
      },
      "value": {
        "type": "String"
      }
    },
    "f2": {
      "caption": {
        "type": "String"
      },
      "value": {
        "type": "String"
      }
    },
    "f3": {
      "caption": {
        "type": "String"
      },
      "value": {
        "type": "String"
      }
    },
    "f4": {
      "caption": {
        "type": "String"
      },
      "value": {
        "type": "String"
      }
    }
  },
  "date": {
    "type": "String"
  },
  "caption": {
    "type": "String"
  },
  "leftheader": {
    "title": {
      "type": "String"
    },
    "defulat": {
      "type": "String"
    },
    "value": {
      "type": "String"
    },
    "style": {
      "type": "String"
    }
  },
  "centerheader": {
    "title": {
      "type": "String"
    },
    "defulat": {
      "type": "String"
    },
    "value": {
      "type": "String"
    },
    "style": {
      "type": "String"
    }
  },
  "rightheader": {
    "title": {
      "type": "String"
    },
    "defulat": {
      "type": "String"
    },
    "value": {
      "type": "String"
    },
    "style": {
      "type": "String"
    }
  },
  "centerfooter": {
    "title": {
      "type": "String"
    },
    "defulat": {
      "type": "String"
    },
    "value": {
      "type": "String"
    },
    "style": {
      "type": "String"
    }
  }
})

const Birth = mongoose.model('BirthCertificate', birthSchema)

module.exports = Birth
