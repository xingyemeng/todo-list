const aclconf = [
  {
    roles:['admin'],
    allows:[
      {resources:'/things', permissions:'get'}
    ]
  }
]

module.exports = aclconf
