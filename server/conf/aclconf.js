const aclconf = [
  {
    roles:['semuser'],
    allows:[
      {resources: [ '/work/view', '/work/failwork', '/work/postwork' ], permissions:'*'}
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
      {resources: [ '/work/verifywork', '/work/group' ], permissions:'*'}
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
