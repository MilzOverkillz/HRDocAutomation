import bcrypt from 'bcryptjs'

const hash = '$2b$10$sJlFThNL9sJ24sJQLgRVfO8CxtbdHSqrpkXmcSnpSJkMoE2YwPqAG'

bcrypt.compare('admin123', hash).then(result => {
  console.log('Password matches:', result)
})