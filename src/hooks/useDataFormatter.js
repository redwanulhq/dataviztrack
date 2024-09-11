import { useSelector } from "react-redux";

const useDataFormatter = (type) => {
  const employees = useSelector((state) => state?.home?.curr_data);

  const employeeWiseWorkingHours = () => {
    const calculateWorkingHours = (checkInTime, checkOutTime) => {
      const checkIn = new Date(`01/01/2000 ${checkInTime}`);
      const checkOut = new Date(`01/01/2000 ${checkOutTime}`);
      const timeDiff = checkOut - checkIn;
      return (timeDiff / 1000 / 60 / 60).toFixed(1);
    };
    const workingHoursArray = [];

    employees.forEach((employee) => {
      const employeeName = employee["Employee Name"];
      const checkInTime = employee["Check-In Time"];
      const checkOutTime = employee["Check-Out Time"];

      const totalHours = parseFloat(
        calculateWorkingHours(checkInTime, checkOutTime)
      );

      workingHoursArray.push({
        name: employeeName,
        value: totalHours,
      });
    });

    return workingHoursArray;
  };

  const dateWiseWorkingHour = () => {
    function calculateWorkingHours(checkInTime, checkOutTime) {
      const checkIn = new Date(`01/01/2000 ${checkInTime}`);
      const checkOut = new Date(`01/01/2000 ${checkOutTime}`);
      return (checkOut - checkIn) / 1000 / 60 / 60;
    }

    const workingHoursByDate = {};

    employees.forEach((employee) => {
      const date = employee["Date"];
      const checkInTime = employee["Check-In Time"];
      const checkOutTime = employee["Check-Out Time"];

      const totalHours = calculateWorkingHours(checkInTime, checkOutTime);

      if (workingHoursByDate[date]) {
        workingHoursByDate[date] += totalHours;
      } else {
        workingHoursByDate[date] = totalHours;
      }
    });

    const workingHoursArray = Object.entries(workingHoursByDate).map(
      ([date, totalHours]) => ({
        name: date,
        total_working_hour: totalHours < 0 ? 0 : totalHours.toFixed(1),
      })
    );
    return workingHoursArray;
  };

  const formatTimeForBarChart = () => {
    const formattedData = employees.map((employee) => {
      const checkInTime = employee["Check-In Time"];
      const checkOutTime = employee["Check-Out Time"];

      const checkInTimeParts = checkInTime.split(" ");
      const checkOutTimeParts = checkOutTime.split(" ");

      let checkInHours = parseInt(checkInTimeParts[0].split(":")[0]);
      const checkInMinutes = parseInt(checkInTimeParts[0].split(":")[1]);
      const checkInMeridiem = checkInTimeParts[1];

      let checkOutHours = parseInt(checkOutTimeParts[0].split(":")[0]);
      const checkOutMinutes = parseInt(checkOutTimeParts[0].split(":")[1]);
      const checkOutMeridiem = checkOutTimeParts[1];

      // Convert check-in and check-out times to 24-hour format
      if (checkInMeridiem === "PM" && checkInHours !== 12) {
        checkInHours += 12;
      }
      if (checkOutMeridiem === "PM" && checkOutHours !== 12) {
        checkOutHours += 12;
      }

      // Calculate the check-in and check-out times in decimal form
      const checkInDecimal = checkInHours + checkInMinutes / 60;
      const checkOutDecimal = checkOutHours + checkOutMinutes / 60;

      return {
        name: employee["Employee Name"],
        check_in: checkInDecimal.toFixed(1),
        checkout: checkOutDecimal.toFixed(1),
      };
    });
    return formattedData;
  };

  return type === "pie"
    ? employeeWiseWorkingHours()
    : type === "bar"
    ? formatTimeForBarChart()
    : dateWiseWorkingHour();
};

export default useDataFormatter;
