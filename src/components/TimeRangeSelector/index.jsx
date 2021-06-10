import './index.css'

const timeRange = ['long_term', 'medium_term', 'short_term']
const names = ['All Time', 'Last 6 months', 'Last 4 weeks']

export default function TimeRangeSelector() {

    const buttonHandler = () => {
        
    }

    return (
        <>
            {
                timeRange.map( (time, index) => <button onClick={buttonHandler}>{names[index]}</button>)
            }
            
        </>
    )
}
