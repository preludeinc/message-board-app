import Table from 'react-bootstrap/Table'
import MessageRow from '@/components/MessageRow'

// renders table
const MessageTable = ({ messages }) => {
  return (
    <Table striped bordered hover border rounded-1 className="mt-2 pt-5 pl-3">
      <thead>
        <tr className="fw-bold">
          <th>&nbsp;#</th>
          <th>&nbsp;Name</th>
          <th>&nbsp;Message</th>
        </tr>
      </thead>
      <tbody>
        {messages.map((message, index) =>
          <MessageRow key={message.id} {...message} msgNum={index + 1} />
        )}
      </tbody>
    </Table>
  );
}

export default MessageTable;
