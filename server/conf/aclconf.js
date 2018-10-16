const aclconf = [
  {
    roles:['semuser', 'tecuser'],
    allows:[
      {resources: [ '/work/view', '/work/errwork', '/postwork' ], permissions:'*'}
    ]
  },
  {
    roles:['tecuser'],
    allows:[
      {resources: [ '/work/view'  ], permissions:'*'}
    ]
  },
  {
    roles:['semadmin', 'tecadmin'],
    allows:[
      {resources: [ '/work/verify', '/work/group' ], permissions:'*'}
    ]
  }
]

module.exports = aclconf
