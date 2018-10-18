const aclconf = [
  {
    roles:['semuser'],
    allows:[
      {resources: [ '/work/view', '/work/errwork', '/work/work-page' ], permissions:'*'}
    ]
  },
  {
    roles:['tecuser'],
    allows:[
      {resources: [ '/tec/view'  ], permissions:'*'}
    ]
  },
  {
    roles:['semadmin'],
    allows:[
      {resources: [ '/work/verify', '/work/group' ], permissions:'*'}
    ]
  },
  {
    roles:['tecadmin'],
    allows:[
      {resources: [ '/tec/group' ], permissions:'*'}
    ]
  }
]

module.exports = aclconf
