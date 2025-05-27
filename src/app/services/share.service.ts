import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ShareService {
  TIMEZONES = [
    'Africa/Abidjan',
    'Africa/Accra',
    'Africa/Algiers',
    'Africa/Bissau',
    'Africa/Cairo',
    'Africa/Casablanca',
    'Africa/Ceuta',
    'Africa/El_Aaiun',
    'Africa/Johannesburg',
    'Africa/Juba',
    'Africa/Khartoum',
    'Africa/Lagos',
    'Africa/Maputo',
    'Africa/Monrovia',
    'Africa/Nairobi',
    'Africa/Ndjamena',
    'Africa/Sao_Tome',
    'Africa/Tripoli',
    'Africa/Tunis',
    'Africa/Windhoek',
    'America/Adak',
    'America/Anchorage',
    'America/Araguaina',
    'America/Argentina/Buenos_Aires',
    'America/Argentina/Catamarca',
    'America/Argentina/Cordoba',
    'America/Argentina/Jujuy',
    'America/Argentina/La_Rioja',
    'America/Argentina/Mendoza',
    'America/Argentina/Rio_Gallegos',
    'America/Argentina/Salta',
    'America/Argentina/San_Juan',
    'America/Argentina/San_Luis',
    'America/Argentina/Tucuman',
    'America/Argentina/Ushuaia',
    'America/Asuncion',
    'America/Atikokan',
    'America/Bahia',
    'America/Bahia_Banderas',
    'America/Barbados',
    'America/Belem',
    'America/Belize',
    'America/Blanc-Sablon',
    'America/Boa_Vista',
    'America/Bogota',
    'America/Boise',
    'America/Cambridge_Bay',
    'America/Campo_Grande',
    'America/Cancun',
    'America/Caracas',
    'America/Cayenne',
    'America/Chicago',
    'America/Chihuahua',
    'America/Costa_Rica',
    'America/Creston',
    'America/Cuiaba',
    'America/Curacao',
    'America/Danmarkshavn',
    'America/Dawson',
    'America/Dawson_Creek',
    'America/Denver',
    'America/Detroit',
    'America/Edmonton',
    'America/Eirunepe',
    'America/El_Salvador',
    'America/Fort_Nelson',
    'America/Fortaleza',
    'America/Glace_Bay',
    'America/Godthab',
    'America/Goose_Bay',
    'America/Grand_Turk',
    'America/Guatemala',
    'America/Guayaquil',
    'America/Guyana',
    'America/Halifax',
    'America/Havana',
    'America/Hermosillo',
    'America/Indiana/Indianapolis',
    'America/Indiana/Knox',
    'America/Indiana/Marengo',
    'America/Indiana/Petersburg',
    'America/Indiana/Tell_City',
    'America/Indiana/Vevay',
    'America/Indiana/Vincennes',
    'America/Indiana/Winamac',
    'America/Inuvik',
    'America/Iqaluit',
    'America/Jamaica',
    'America/Juneau',
    'America/Kentucky/Louisville',
    'America/Kentucky/Monticello',
    'America/La_Paz',
    'America/Lima',
    'America/Los_Angeles',
    'America/Maceio',
    'America/Managua',
    'America/Manaus',
    'America/Martinique',
    'America/Matamoros',
    'America/Mazatlan',
    'America/Menominee',
    'America/Merida',
    'America/Metlakatla',
    'America/Mexico_City',
    'America/Miquelon',
    'America/Moncton',
    'America/Monterrey',
    'America/Montevideo',
    'America/Nassau',
    'America/New_York',
    'America/Nipigon',
    'America/Nome',
    'America/Noronha',
    'America/North_Dakota/Beulah',
    'America/North_Dakota/Center',
    'America/North_Dakota/New_Salem',
    'America/Ojinaga',
    'America/Panama',
    'America/Pangnirtung',
    'America/Paramaribo',
    'America/Phoenix',
    'America/Port_of_Spain',
    'America/Port-au-Prince',
    'America/Porto_Velho',
    'America/Puerto_Rico',
    'America/Punta_Arenas',
    'America/Rainy_River',
    'America/Rankin_Inlet',
    'America/Recife',
    'America/Regina',
    'America/Resolute',
    'America/Rio_Branco',
    'America/Santarem',
    'America/Santiago',
    'America/Santo_Domingo',
    'America/Sao_Paulo',
    'America/Scoresbysund',
    'America/Sitka',
    'America/St_Johns',
    'America/Swift_Current',
    'America/Tegucigalpa',
    'America/Thule',
    'America/Thunder_Bay',
    'America/Tijuana',
    'America/Toronto',
    'America/Vancouver',
    'America/Whitehorse',
    'America/Winnipeg',
    'America/Yakutat',
    'America/Yellowknife',
    'Antarctica/Casey',
    'Antarctica/Davis',
    'Antarctica/DumontDUrville', // https://bugs.chromium.org/p/chromium/issues/detail?id=928068
    'Antarctica/Macquarie',
    'Antarctica/Mawson',
    'Antarctica/Palmer',
    'Antarctica/Rothera',
    'Antarctica/Syowa',
    'Antarctica/Troll',
    'Antarctica/Vostok',
    'Asia/Almaty',
    'Asia/Amman',
    'Asia/Anadyr',
    'Asia/Aqtau',
    'Asia/Aqtobe',
    'Asia/Ashgabat',
    'Asia/Atyrau',
    'Asia/Baghdad',
    'Asia/Baku',
    'Asia/Bangkok',
    'Asia/Barnaul',
    'Asia/Beirut',
    'Asia/Bishkek',
    'Asia/Brunei',
    'Asia/Chita',
    'Asia/Choibalsan',
    'Asia/Colombo',
    'Asia/Damascus',
    'Asia/Dhaka',
    'Asia/Dili',
    'Asia/Dubai',
    'Asia/Dushanbe',
    'Asia/Famagusta',
    'Asia/Gaza',
    'Asia/Hebron',
    'Asia/Ho_Chi_Minh',
    'Asia/Hong_Kong',
    'Asia/Hovd',
    'Asia/Irkutsk',
    'Asia/Jakarta',
    'Asia/Jayapura',
    'Asia/Jerusalem',
    'Asia/Kabul',
    'Asia/Kamchatka',
    'Asia/Karachi',
    'Asia/Kathmandu',
    'Asia/Khandyga',
    'Asia/Kolkata',
    'Asia/Krasnoyarsk',
    'Asia/Kuala_Lumpur',
    'Asia/Kuching',
    'Asia/Macau',
    'Asia/Magadan',
    'Asia/Makassar',
    'Asia/Manila',
    'Asia/Nicosia',
    'Asia/Novokuznetsk',
    'Asia/Novosibirsk',
    'Asia/Omsk',
    'Asia/Oral',
    'Asia/Pontianak',
    'Asia/Pyongyang',
    'Asia/Qatar',
    'Asia/Qostanay', // https://bugs.chromium.org/p/chromium/issues/detail?id=928068
    'Asia/Qyzylorda',
    'Asia/Riyadh',
    'Asia/Sakhalin',
    'Asia/Samarkand',
    'Asia/Seoul',
    'Asia/Shanghai',
    'Asia/Singapore',
    'Asia/Srednekolymsk',
    'Asia/Taipei',
    'Asia/Tashkent',
    'Asia/Tbilisi',
    'Asia/Tehran',
    'Asia/Thimphu',
    'Asia/Tokyo',
    'Asia/Tomsk',
    'Asia/Ulaanbaatar',
    'Asia/Urumqi',
    'Asia/Ust-Nera',
    'Asia/Vladivostok',
    'Asia/Yakutsk',
    'Asia/Yangon',
    'Asia/Yekaterinburg',
    'Asia/Yerevan',
    'Atlantic/Azores',
    'Atlantic/Bermuda',
    'Atlantic/Canary',
    'Atlantic/Cape_Verde',
    'Atlantic/Faroe',
    'Atlantic/Madeira',
    'Atlantic/Reykjavik',
    'Atlantic/South_Georgia',
    'Atlantic/Stanley',
    'Australia/Adelaide',
    'Australia/Brisbane',
    'Australia/Broken_Hill',
    'Australia/Currie',
    'Australia/Darwin',
    'Australia/Eucla',
    'Australia/Hobart',
    'Australia/Lindeman',
    'Australia/Lord_Howe',
    'Australia/Melbourne',
    'Australia/Perth',
    'Australia/Sydney',
    'Europe/Amsterdam',
    'Europe/Andorra',
    'Europe/Astrakhan',
    'Europe/Athens',
    'Europe/Belgrade',
    'Europe/Berlin',
    'Europe/Brussels',
    'Europe/Bucharest',
    'Europe/Budapest',
    'Europe/Chisinau',
    'Europe/Copenhagen',
    'Europe/Dublin',
    'Europe/Gibraltar',
    'Europe/Helsinki',
    'Europe/Istanbul',
    'Europe/Kaliningrad',
    'Europe/Kiev',
    'Europe/Kirov',
    'Europe/Lisbon',
    'Europe/London',
    'Europe/Luxembourg',
    'Europe/Madrid',
    'Europe/Malta',
    'Europe/Minsk',
    'Europe/Monaco',
    'Europe/Moscow',
    'Europe/Oslo',
    'Europe/Paris',
    'Europe/Prague',
    'Europe/Riga',
    'Europe/Rome',
    'Europe/Samara',
    'Europe/Saratov',
    'Europe/Simferopol',
    'Europe/Sofia',
    'Europe/Stockholm',
    'Europe/Tallinn',
    'Europe/Tirane',
    'Europe/Ulyanovsk',
    'Europe/Uzhgorod',
    'Europe/Vienna',
    'Europe/Vilnius',
    'Europe/Volgograd',
    'Europe/Warsaw',
    'Europe/Zaporozhye',
    'Europe/Zurich',
    'Indian/Chagos',
    'Indian/Christmas',
    'Indian/Cocos',
    'Indian/Kerguelen',
    'Indian/Mahe',
    'Indian/Maldives',
    'Indian/Mauritius',
    'Indian/Reunion',
    'Pacific/Apia',
    'Pacific/Auckland',
    'Pacific/Bougainville',
    'Pacific/Chatham',
    'Pacific/Chuuk',
    'Pacific/Easter',
    'Pacific/Efate',
    'Pacific/Enderbury',
    'Pacific/Fakaofo',
    'Pacific/Fiji',
    'Pacific/Funafuti',
    'Pacific/Galapagos',
    'Pacific/Gambier',
    'Pacific/Guadalcanal',
    'Pacific/Guam',
    'Pacific/Honolulu',
    'Pacific/Kiritimati',
    'Pacific/Kosrae',
    'Pacific/Kwajalein',
    'Pacific/Majuro',
    'Pacific/Marquesas',
    'Pacific/Nauru',
    'Pacific/Niue',
    'Pacific/Norfolk',
    'Pacific/Noumea',
    'Pacific/Pago_Pago',
    'Pacific/Palau',
    'Pacific/Pitcairn',
    'Pacific/Pohnpei',
    'Pacific/Port_Moresby',
    'Pacific/Rarotonga',
    'Pacific/Tahiti',
    'Pacific/Tarawa',
    'Pacific/Tongatapu',
    'Pacific/Wake',
    'Pacific/Wallis',
  ];


  TIME_ZONES_ARRAY : SingleSelect2Option[] = this.TIMEZONES.map((zone, index) => ({
    label: zone,
    value: index + 1
  }));

  readonly BLOOD_GROUP_ARRAY : SingleSelect2Option[] = [
    {
      label: 'O+',
      value: 1
    },
    {
      label: 'A+',
      value: 2
    },
    {
      label: 'B+',
      value: 3
    },
    {
      label: 'AB+',
      value: 4
    },
    {
      label: 'O-',
      value: 5
    },
    {
      label: 'A-',
      value: 6
    },
    {
      label: 'B-',
      value: 7
    },
    {
      label: 'AB-',
      value: 8
    }
  ];

  readonly BLOOD_GROUP = {
    1: 'O+',
    2: 'A+',
    3: 'B+',
    4: 'AB+',
    5: 'O-',
    6: 'A-',
    7: 'B-',
    8: 'AB-',
  }

  readonly APPOINTMENT_STATUS_ARRAY : SingleSelect2Option[] = [
    { 
      label: 'Booked',
      value: 1
    },
    {
      label: 'Checked In',
      value: 2
    },
    {
      label: 'Checked Out',
      value: 3
    },
    {
      label: 'Cancelled',
      value: 4
    }
  ];

  readonly APPOINTMENT_STATUS = {
    1 : 'Booked',
    2 : 'Checked In',
    3 : 'Checked Out',
    4 : 'Cancelled',
  }

  readonly GENDER = {
    1: 'Male',
    2: 'Female',
  }

  readonly MARIUS_STATUS : SingleSelect2Option[] = [
    { 
      label: 'Single',
      value: 1
    },
    {
      label: 'Married',
      value: 2
    },
    {
      label: 'Widowed',
      value: 3
    },
    {
      label: 'Divorced',
      value: 4
    }
  ];

  readonly ETHNICITY : SingleSelect2Option[] = [
    {
      label: 'Malay',
      value: 1
    },
    {
      label: 'Chinese',
      value: 2
    },
    {
      label: 'Indian',
      value: 3
    },
    {
      label: 'Kadazan-Dusun',
      value: 4
    },
    {
      label: 'Bajau',
      value: 5
    },
    {
      label: 'Murut',
      value: 6
    }
  ];

  readonly RACES : SingleSelect2Option[] = [
    {
      label: 'Malay',
      value: 1
    },
    {
      label: 'Chinese',
      value: 2
    },
    {
      label: 'Indian',
      value: 3
    },
    {
      label: 'Other',
      value: 4
    }
  ];

  readonly RELIGION : SingleSelect2Option[] = [
    {
      label: 'Muslim',
      value: 1
    },
    {
      label: 'Buddhist',
      value: 2
    },
    {
      label: 'Christian',
      value: 3
    },
    {
      label: 'Confucianism',
      value: 4
    },
    {
      label: 'Taoism',
      value: 5
    },
    {
      label: 'Other',
      value: 6
    },
    {
      label: 'Unspecified / None',
      value: 7
    }
  ];

  readonly ALLERGY : SingleSelect2Option[] = [
    {
      label: 'No',
      value: 0
    },
    {
      label: 'Yes',
      value: 1
    },
    {
      label: 'Unknown',
      value: 2
    },
  ];

  readonly G6PD : SingleSelect2Option[] = [
    {
      label: 'No',
      value: 0
    },
    {
      label: 'Yes',
      value: 1
    },
    {
      label: 'Unknown',
      value: 2
    },
  ];

  readonly ID_TYPES : SingleSelect2Option[] = [
    {
      label: 'NRIC',
      value: 1
    },
    {
      label: 'Passport',
      value: 2
    },
    {
      label: 'Other',
      value: 3
    },
  ]

  readonly PAYMENT_STATUS_ARRAY : SingleSelect2Option[] = [
    {
      label: 'Pending',
      value: 1
    },
    {
      label: 'Paid',
      value: 2
    },
  ]

  getBadgeColor(index : number)
  {
    const colors = [
      'primary',
      'danger',
      'success',
      'info',
      'warning',
      'dark',
    ];

    index = index % 6;
    return colors[index];
  }

  calculateAge(birthdate : string) {
    const today = new Date();
    const birhtDaySplit = birthdate.split('/');
    const birthMonth = parseInt(birhtDaySplit[1]);
    const birthYear = parseInt(birhtDaySplit[2]);

    const month = parseInt(String(today.getMonth() + 1).padStart(2, '0'));
    const year = today.getFullYear();

    let age = year - birthYear;
    const monthDifference = month - birthMonth;
    const dayDifference = year - birthYear;
    
    // Adjust the age if the birthdate hasn't occurred yet this year
    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--;
    }

    return age;
  }
}

export interface SingleSelect2Option {
  label: string;
  value: any;
}
