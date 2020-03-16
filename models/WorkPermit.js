const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const workpermitSchema = mongoose.Schema(
    {
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
          "nationaltiy": {
            "type": "String"
          },
          "sex": {
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
          "dateofbirth": {
            "type": "String"
          }
        },
        "s1": {
          "caption": {
            "type": "String"
          },
          "f0": {
            "caption": {
              "type": "String"
            },
            "value": {
              "type": "String"
            }
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
          },
          "f6": {
            "caption": {
              "type": "String"
            },
            "value": {
              "type": "String"
            }
          },
          "f7": {
            "caption": {
              "type": "String"
            },
            "value": {
              "type": "String"
            }
          },
          "f8": {
            "caption": {
              "type": "String"
            },
            "value": {
              "type": "String"
            }
          },
          "f9": {
            "caption": {
              "type": "String"
            },
            "value": {
              "type": "String"
            }
          },
          "f10": {
            "caption": {
              "type": "String"
            },
            "value": {
              "type": "String"
            }
          },
          "f11": {
            "caption": {
              "type": "String"
            },
            "value": {
              "type": "String"
            }
          },
          "f12": {
            "caption": {
              "type": "String"
            },
            "value": {
              "type": "String"
            }
          },
          "f13": {
            "caption": {
              "type": "String"
            },
            "value": {
              "type": "String"
            }
          },
          "f14": {
            "caption": {
              "type": "String"
            },
            "value": {
              "type": "String"
            }
          },
          "f15": {
            "caption": {
              "type": "String"
            },
            "value": {
              "type": "String"
            }
          },
          "f16": {
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
      }
)

const WPermit = mongoose.model('WorkPermitCertificate', workpermitSchema)

module.exports = WPermit
