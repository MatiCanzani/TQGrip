// sanitize user input before further processing?

let input = `<img src="x" onerror="alert('XSS attacks!')">`;
const sanitizeInput = () => {

  //replace special characters to their entity equivalents.
  const sanitizedInput = input.replace(
    /[&<>'"()]/g, 
    (tag) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;",
        "(": "&#40",
        ")": "&#41",
      }[tag])
  );
  return sanitizedInput.trim();
};
sanitizeInput();



const records = [
  {
    user_id: 1,
    device: "Windows 10",
    action: "start",
    date_actioned: 100,
  },
  {
    user_id: 2,
    device: "OSX 15.4",
    action: "start",
    date_actioned: 200,
  },
  {
    user_id: 1,
    device: "iPhone 8s",
    action: "start",
    date_actioned: 250,
  },
  {
    user_id: 1,
    device: "Windows 10",
    action: "stop",
    date_actioned: 370,
  },
  {
    user_id: 1,
    device: "iPhone 8s",
    action: "stop",
    date_actioned: 410,
  },
  {
    user_id: 2,
    device: "OSX 15.4",
    action: "stop",
    date_actioned: 490,
  },
  {
    user_id: 3,
    device: "Windows",
    action: "start",
    date_actioned: 700,
  },
];


// get user id from records.
const getUsers = (records, action, start_time, end_time) => {
  let userIds = [];

  //check if the action exist in records
  const isExistAction = records.some((record) => record.action === action);

  records.filter((record) => {
    if (!isExistAction) throw "No records for this action";
    try {
      if (
        record.action === action &&
        record.date_actioned >= start_time &&
        record.date_actioned <= end_time
      ) {
        //validate if user id is already exist in the array
        if (userIds.indexOf(record.user_id) === -1) {
          userIds.push(record.user_id);
        }
      }
    } catch (err) {
      alert(err);
    }
  });   

  return userIds;
};
getUsers(records, "start", 100, 700);


// get total "unique" playback time in seconds.
const getPlaybackTime = (userId, records) => {
  let playBackTimes = [];
  try {
    const filteredUserIds = records.filter(
      (record) => record.user_id === userId
    );

    //check if the "stop" action exist in records
    const isExistStopAction = filteredUserIds.some(
      (record) => record.action === "stop"
    );

    filteredUserIds.forEach((record) => {
    
      if (!isExistStopAction) throw "The video only have start action";
      playBackTimes.push(record.date_actioned);
    });

    //get difference between min and max values.
    const totalPlayBackTime =
      Math.max(...playBackTimes) - Math.min(...playBackTimes);

    return totalPlayBackTime;
  } catch (err) {
    alert(err);
  }
};
getPlaybackTime(1, records);
