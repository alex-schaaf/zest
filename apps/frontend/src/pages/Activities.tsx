import Card from "@/components/ui/Card"
import ActivitiesCalendarContainer from "@/components/ActivitiesCalendarContainer"
import ActivitiesTableContainer from "@/components/ActivitiesTableContainer"

const Activities = () => {
  return (
    <div className="container mx-auto space-y-4">
      <Card>
        <ActivitiesCalendarContainer />
      </Card>
      <Card>
        <ActivitiesTableContainer />
      </Card>
    </div>
  )
}

export default Activities
