import request from "supertest";

import { app } from "../../index";

describe("POST /users/:userId/activities", () => {
  it("responds with json", () => {
    request(app)
      .post("/users/1/activities")
      .send(activity)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});

const activity = {
  resource_state: 2,
  athlete: { id: 28878676, resource_state: 1 },
  name: "Afternoon Run",
  distance: 6001.1,
  moving_time: 2562,
  elapsed_time: 2562,
  total_elevation_gain: 78.1,
  type: "Run",
  sport_type: "Run",
  workout_type: 0,
  id: 8390680888,
  start_date: "2023-01-14T14:07:47Z",
  start_date_local: "2023-01-14T15:07:47Z",
  timezone: "(GMT+01:00) Europe/Berlin",
  utc_offset: 3600.0,
  location_city: null,
  location_state: null,
  location_country: "Germany",
  achievement_count: 0,
  kudos_count: 0,
  comment_count: 0,
  athlete_count: 1,
  photo_count: 0,
  map: {
    id: "a8390680888",
    summary_polyline:
      "myuyHiys{@IQ[OAEUCKUMw@E}AESGeAIYSSEC]EWMM@o@GM?a@OQSMAIIYM_@IYAc@FS?QGg@AQDc@GIIMcAOk@Go@Mq@m@qHYuB@KSqCMmCIa@QIW@y@b@I@aAt@MDs@f@OFWRm@n@]Va@TOJUBDJGLeAl@o@T{@n@a@d@_Ar@yAbAQFi@\\ML{@j@aCfBeAr@UHmAGu@QmBEa@IaA?[C]@[EYGgBEc@I_@AgCSa@Gy@?e@GaAEiBQu@AUEk@CyAC_AIi@I_@CYEyAMkAWk@GsAa@sCe@sBc@i@IsCo@eA_@sAK[E_@OwAUME_@CoBc@WC]ISCE@lATn@PdARl@NpCb@~@Vx@H~A^~@J`ATRBjAZvB`@rAZb@FdB^|AVnE\\~AFXD|@DfANZBTAl@H|CLdBNpAHPBt@?vANrBJr@J~@?n@DbAJx@DJBFJ\\|ADlA@dA@LJVJNLJ^TlBzAp@n@PJP@z@Ml@OXErAc@B?\\Tn@Iz@Up@Kn@WVCZKl@St@c@`@Mx@Qf@WX?NAdBy@tA]BB@DT~DNxABRHPVZJDr@AfAFTCP?TDJNPL`@J`@D`@?`@I|@G^@b@?LDDANF",
    resource_state: 2,
  },
  trainer: false,
  commute: false,
  manual: false,
  private: false,
  visibility: "followers_only",
  flagged: false,
  gear_id: "g10019712",
  start_latlng: [51.561967860907316, 9.93661880493164],
  end_latlng: [51.562059223651886, 9.936604304239154],
  average_speed: 2.342,
  max_speed: 4.368,
  average_cadence: 75.5,
  has_heartrate: true,
  average_heartrate: 137.8,
  max_heartrate: 162.0,
  heartrate_opt_out: false,
  display_hide_heartrate_option: true,
  elev_high: 211.1,
  elev_low: 161.2,
  upload_id: 8999974184,
  upload_id_str: "8999974184",
  external_id: "garmin_ping_255358758165",
  from_accepted_tag: false,
  pr_count: 0,
  total_photo_count: 0,
  has_kudoed: false,
};
