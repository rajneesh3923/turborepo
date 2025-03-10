import { Barcode } from 'lucide-react'
import  {Button}  from "@/components/ui/button";

interface BoardingPassProps {
  agentName: string
  from: string
  to: string
  date: string
  passanger: string
  seat: string
  farePrice: string
 airline: string
}

const defaultProps: BoardingPassProps = {
  agentName: "JOHN DOE",
  from: "NEW YORK",
  to: "LONDON",
  date: "15 MAY 2024",
  passanger: "A22",
  seat: "24A",
  farePrice: "10:30",
  airline: "VS001"
}

export default function BoardingPass(props: BoardingPassProps = defaultProps) {
  const {
    agentName,
    from,
    to,
    date,
    passanger,
    seat,
    farePrice,
   airline
  } = props

  return (
    <div className="max-w-4xl mx-auto my-8 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex">
        {/* Main section */}
        <div className="flex-grow p-6 border-r border-dashed border-gray-300">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-blue-600">QUOTATION PASS</h1>
            <p className="text-lg font-semibold">{airline}</p>
          </div>
          <div className="flex justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600">Agent</p>
              <p className="font-mono font-bold">{agentName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Date</p>
              <p className="font-mono font-semibold">{date}</p>
            </div>
          </div>
          <div className="flex justify-between items-end mb-4">
            <div>
              <p className="text-sm text-gray-600">From</p>
              <p className="text-xl font-bold">{from}</p>
            </div>
            <div className="text-center">
              <Barcode className="w-16 h-8 text-blue-600" />
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">To</p>
              <p className="text-xl font-bold">{to}</p>
            </div>
          </div>
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-600">passanger</p>
              <p className="font-mono font-semibold">{passanger}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Fare Price</p>
              <p className="font-mono text-xl  font-bold">₹{farePrice}</p>
            </div>
            <div>
              <Button variant='primary' > Book Now </Button>
            </div>
          </div>
        </div>
        
        {/* Tear-off section */}
        <div className="w-1/4 p-4 bg-gray-100 flex flex-col justify-between">
          <div>
            <p className="text-sm text-gray-600">AirLine</p>
            <p className="font-mono font-bold">{airline}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Date</p>
            <p className="font-mono font-semibold">{date}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">passanger</p>
            <p className="font-mono font-semibold">{passanger}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Fare Price</p>
            <p className="font-mono text-lg text-green-600 font-bold">₹{farePrice}</p>
          </div>
          <div className="mt-2">
          <p className="text-sm text-gray-600">Agent</p>
            <p className="font-mono font-bold">{agentName}</p>
          </div>
        </div>
      </div>
      <div className="bg-blue-600 text-white text-center py-2 text-sm">
        Quotation for your booking request from {agentName} 
      </div>
    </div>
  )
}