import { useSelector } from 'react-redux'
import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import { User } from './User'

const Users = () => {
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)

  let dom = null

  if (user)
    dom = (
      <div>
        <h2>Users</h2>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>username</TableCell>
              <TableCell>blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              users.map(user =>
                <User key={user.id} user={user} />)
            }
          </TableBody>
        </Table>
      </div>
    )

  return dom
}

export default Users
