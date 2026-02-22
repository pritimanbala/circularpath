export interface City {
  id: string
  name: string
}

export interface District {
  id: string
  name: string
  latitude: number
  longitude: number
  cities: City[]
}

export interface State {
  id: string
  name: string
  code: string
  region: string
  districts: District[]
}

export const indiaGeography: State[] = [
  {
    id: 'AP',
    name: 'Andhra Pradesh',
    code: 'AP',
    region: 'south',
    districts: [
      { id: 'anantapur', name: 'Anantapur', cities: [{ id: 'anantapur_city', name: 'Anantapur' }] },
      { id: 'chittoor', name: 'Chittoor', cities: [{ id: 'chittoor_city', name: 'Chittoor' }] },
      { id: 'cuddapah', name: 'YSR Kadapa', cities: [{ id: 'kadapa', name: 'Kadapa' }] },
      { id: 'east_godavari', name: 'East Godavari', cities: [{ id: 'kakinada', name: 'Kakinada' }] },
      { id: 'guntur', name: 'Guntur', cities: [{ id: 'guntur_city', name: 'Guntur' }] },
      { id: 'krishna', name: 'Krishna', cities: [{ id: 'vijayawada', name: 'Vijayawada' }] },
      { id: 'kurnool', name: 'Kurnool', cities: [{ id: 'kurnool_city', name: 'Kurnool' }] },
      { id: 'nellore', name: 'Nellore', cities: [{ id: 'nellore_city', name: 'Nellore' }] },
      { id: 'prakasam', name: 'Prakasam', cities: [{ id: 'ongole', name: 'Ongole' }] },
      { id: 'srikakulam', name: 'Srikakulam', cities: [{ id: 'srikakulam_city', name: 'Srikakulam' }] },
      { id: 'visakhapatinam', name: 'Visakhapatnam', cities: [{ id: 'visakhapatnam_city', name: 'Visakhapatnam' }] },
      { id: 'vizianagaram', name: 'Vizianagaram', cities: [{ id: 'vizianagaram_city', name: 'Vizianagaram' }] },
      { id: 'west_godavari', name: 'West Godavari', cities: [{ id: 'eluru', name: 'Eluru' }] }
    ]
  },
  {
    id: 'AR',
    name: 'Arunachal Pradesh',
    code: 'AR',
    region: 'northeast',
    districts: [
      { id: 'anjaw', name: 'Anjaw', cities: [{ id: 'anjaw_city', name: 'Hawai' }] },
      { id: 'changlang', name: 'Changlang', cities: [{ id: 'changlang_city', name: 'Changlang' }] },
      { id: 'dibang_valley', name: 'Dibang Valley', cities: [{ id: 'anini', name: 'Anini' }] },
      { id: 'east_kameng', name: 'East Kameng', cities: [{ id: 'seppa', name: 'Seppa' }] },
      { id: 'east_siang', name: 'East Siang', cities: [{ id: 'pasighat', name: 'Pasighat' }] },
      { id: 'west_kameng', name: 'West Kameng', cities: [{ id: 'bomdila', name: 'Bomdila' }] },
      { id: 'kra_daadi', name: 'Kra Daadi', cities: [{ id: 'panarua', name: 'Panarua' }] },
      { id: 'kurung_kumey', name: 'Kurung Kumey', cities: [{ id: 'koloriang', name: 'Koloriang' }] },
      { id: 'lepa_rada', name: 'Lepa Rada', cities: [{ id: 'dumporijo', name: 'Dumporijo' }] },
      { id: 'lohit', name: 'Lohit', cities: [{ id: 'tezu', name: 'Tezu' }] },
      { id: 'longding', name: 'Longding', cities: [{ id: 'longding_city', name: 'Longding' }] },
      { id: 'lower_dibang_valley', name: 'Lower Dibang Valley', cities: [{ id: 'roing', name: 'Roing' }] },
      { id: 'lower_siang', name: 'Lower Siang', cities: [{ id: 'jonai', name: 'Jonai' }] },
      { id: 'lower_subansiri', name: 'Lower Subansiri', cities: [{ id: 'ziro', name: 'Ziro' }] },
      { id: 'namsai', name: 'Namsai', cities: [{ id: 'namsai_city', name: 'Namsai' }] },
      { id: 'pakke_kessang', name: 'Pakke-Kessang', cities: [{ id: 'doimukh', name: 'Doimukh' }] },
      { id: 'papum_pare', name: 'Papum Pare', cities: [{ id: 'itanagar', name: 'Itanagar' }] },
      { id: 'siang', name: 'Siang', cities: [{ id: 'boleng', name: 'Boleng' }] },
      { id: 'tawang', name: 'Tawang', cities: [{ id: 'tawang_city', name: 'Tawang' }] },
      { id: 'tirap', name: 'Tirap', cities: [{ id: 'khonsa', name: 'Khonsa' }] },
      { id: 'upper_siang', name: 'Upper Siang', cities: [{ id: 'yingkiong', name: 'Yingkiong' }] },
      { id: 'upper_subansiri', name: 'Upper Subansiri', cities: [{ id: 'daporijo', name: 'Daporijo' }] },
      { id: 'west_siang', name: 'West Siang', cities: [{ id: 'aalo', name: 'Aalo' }] },
      { id: 'zia_sadiya', name: 'Zia Sadiya', cities: [{ id: 'sadiya', name: 'Sadiya' }] }
    ]
  },
  {
    id: 'AS',
    name: 'Assam',
    code: 'AS',
    region: 'northeast',
    districts: [
      { id: 'baksa', name: 'Baksa', cities: [{ id: 'mushalpur', name: 'Mushalpur' }] },
      { id: 'barpeta', name: 'Barpeta', cities: [{ id: 'barpeta_city', name: 'Barpeta' }] },
      { id: 'biswanath', name: 'Biswanath', cities: [{ id: 'biswanath_city', name: 'Biswanath' }] },
      { id: 'bongaigaon', name: 'Bongaigaon', cities: [{ id: 'bongaigaon_city', name: 'Bongaigaon' }] },
      { id: 'cachar', name: 'Cachar', cities: [{ id: 'silchar', name: 'Silchar' }] },
      { id: 'charaideo', name: 'Charaideo', cities: [{ id: 'sivasagar', name: 'Sivasagar' }] },
      { id: 'chirang', name: 'Chirang', cities: [{ id: 'chirang_city', name: 'Chirang' }] },
      { id: 'darrang', name: 'Darrang', cities: [{ id: 'mangaldoi', name: 'Mangaldoi' }] },
      { id: 'dhemaji', name: 'Dhemaji', cities: [{ id: 'dhemaji_city', name: 'Dhemaji' }] },
      { id: 'dima_hasao', name: 'Dima Hasao', cities: [{ id: 'haflong', name: 'Haflong' }] },
      { id: 'dibrugarh', name: 'Dibrugarh', cities: [{ id: 'dibrugarh_city', name: 'Dibrugarh' }] },
      { id: 'goalpara', name: 'Goalpara', cities: [{ id: 'goalpara_city', name: 'Goalpara' }] },
      { id: 'golaghat', name: 'Golaghat', cities: [{ id: 'golaghat_city', name: 'Golaghat' }] },
      { id: 'hailakandi', name: 'Hailakandi', cities: [{ id: 'hailakandi_city', name: 'Hailakandi' }] },
      { id: 'hojai', name: 'Hojai', cities: [{ id: 'hojai_city', name: 'Hojai' }] },
      { id: 'jorhat', name: 'Jorhat', cities: [{ id: 'jorhat_city', name: 'Jorhat' }] },
      { id: 'kamrup', name: 'Kamrup', cities: [{ id: 'guwahati', name: 'Guwahati' }] },
      { id: 'kamrup_metro', name: 'Kamrup Metropolitan', cities: [{ id: 'guwahati', name: 'Guwahati' }] },
      { id: 'karbi_anglong', name: 'Karbi Anglong', cities: [{ id: 'diphu', name: 'Diphu' }] },
      { id: 'karimganj', name: 'Karimganj', cities: [{ id: 'karimganj_city', name: 'Karimganj' }] },
      { id: 'kokrajhar', name: 'Kokrajhar', cities: [{ id: 'kokrajhar_city', name: 'Kokrajhar' }] },
      { id: 'lakhimpur', name: 'Lakhimpur', cities: [{ id: 'north_lakhimpur', name: 'North Lakhimpur' }] },
      { id: 'majuli', name: 'Majuli', cities: [{ id: 'garamur', name: 'Garamur' }] },
      { id: 'morigaon', name: 'Morigaon', cities: [{ id: 'morigaon_city', name: 'Morigaon' }] },
      { id: 'nagaon', name: 'Nagaon', cities: [{ id: 'nagaon_city', name: 'Nagaon' }] },
      { id: 'nalbari', name: 'Nalbari', cities: [{ id: 'nalbari_city', name: 'Nalbari' }] },
      { id: 'sivasagar', name: 'Sivasagar', cities: [{ id: 'sivasagar_city', name: 'Sivasagar' }] },
      { id: 'sonitpur', name: 'Sonitpur', cities: [{ id: 'tezpur', name: 'Tezpur' }] },
      { id: 'tinsukia', name: 'Tinsukia', cities: [{ id: 'tinsukia_city', name: 'Tinsukia' }] },
      { id: 'udalguri', name: 'Udalguri', cities: [{ id: 'udalguri_city', name: 'Udalguri' }] },
      { id: 'west_karbi_anglong', name: 'West Karbi Anglong', cities: [{ id: 'hamren', name: 'Hamren' }] }
    ]
  },
  {
    id: 'ML',
    name: 'Meghalaya',
    code: 'ML',
    region: 'northeast',
    districts: [
      { id: 'east_garo_hills', name: 'East Garo Hills', cities: [{ id: 'williamnagar', name: 'Williamnagar' }] },
      { id: 'east_khasi_hills', name: 'East Khasi Hills', cities: [{ id: 'shillong', name: 'Shillong' }] },
      { id: 'jaintia_hills', name: 'Jaintia Hills', cities: [{ id: 'jowai', name: 'Jowai' }] },
      { id: 'north_garo_hills', name: 'North Garo Hills', cities: [{ id: 'tura', name: 'Tura' }] },
      { id: 'ri_bhoi', name: 'Ri-Bhoi', cities: [{ id: 'nongpoh', name: 'Nongpoh' }] },
      { id: 'south_garo_hills', name: 'South Garo Hills', cities: [{ id: 'baghmara', name: 'Baghmara' }] },
      { id: 'south_west_garo_hills', name: 'South West Garo Hills', cities: [{ id: 'ampati', name: 'Ampati' }] },
      { id: 'south_west_khasi_hills', name: 'South West Khasi Hills', cities: [{ id: 'khliehriat', name: 'Khliehriat' }] },
      { id: 'west_garo_hills', name: 'West Garo Hills', cities: [{ id: 'tura_west', name: 'Tura' }] },
      { id: 'west_khasi_hills', name: 'West Khasi Hills', cities: [{ id: 'nongstoin', name: 'Nongstoin' }] },
      { id: 'khasi_hills', name: 'Khasi Hills', cities: [{ id: 'shillong_khasi', name: 'Shillong' }] }
    ]
  },
  {
    id: 'WB',
    name: 'West Bengal',
    code: 'WB',
    region: 'east',
    districts: [
      { id: 'alipurduar', name: 'Alipurduar', cities: [{ id: 'alipurduar_city', name: 'Alipurduar' }] },
      { id: 'bankura', name: 'Bankura', cities: [{ id: 'bankura_city', name: 'Bankura' }] },
      { id: 'birbhum', name: 'Birbhum', cities: [{ id: 'bolpur', name: 'Bolpur' }] },
      { id: 'cooch_behar', name: 'Cooch Behar', cities: [{ id: 'cooch_behar_city', name: 'Cooch Behar' }] },
      { id: 'darjeeling', name: 'Darjeeling', cities: [{ id: 'darjeeling_city', name: 'Darjeeling' }, { id: 'kalimpong', name: 'Kalimpong' }] },
      { id: 'dakshin_dinajpur', name: 'Dakshin Dinajpur', cities: [{ id: 'balurghat', name: 'Balurghat' }] },
      { id: 'dinajpur', name: 'Dinajpur', cities: [{ id: 'dinajpur_city', name: 'Dinajpur' }] },
      { id: 'east_bardhaman', name: 'East Bardhaman', cities: [{ id: 'bardhaman', name: 'Bardhaman' }] },
      { id: 'east_midnapore', name: 'East Midnapore', cities: [{ id: 'medinipur', name: 'Medinipur' }] },
      { id: 'howrah', name: 'Howrah', latitude: 22.5958, longitude: 88.2636, cities: [{ id: 'howrah_city', name: 'Howrah' }] },
      { id: 'hooghly', name: 'Hooghly', cities: [{ id: 'hooghly_city', name: 'Hooghly' }] },
      { id: 'jalpaiguri', name: 'Jalpaiguri', cities: [{ id: 'jalpaiguri_city', name: 'Jalpaiguri' }] },
      { id: 'jhargram', name: 'Jhargram', cities: [{ id: 'jhargram_city', name: 'Jhargram' }] },
      { id: 'kalimpong', name: 'Kalimpong', cities: [{ id: 'kalimpong_city', name: 'Kalimpong' }] },
      { id: 'kolkata', name: 'Kolkata', latitude: 22.5726, longitude: 88.3639, cities: [{ id: 'kolkata_city', name: 'Kolkata' }] },
      { id: 'murshidabad', name: 'Murshidabad', latitude: 24.1793, longitude: 88.2618, cities: [{ id: 'murshidabad_city', name: 'Murshidabad' }] },
      { id: 'nadia', name: 'Nadia', latitude: 23.8500, longitude: 88.3500, cities: [{ id: 'krishnanagar', name: 'Krishnanagar' }] },
      { id: 'north_24_parganas', name: 'North 24 Parganas', latitude: 22.6500, longitude: 88.9000, cities: [{ id: 'barasat', name: 'Barasat' }] },
      { id: 'purba_bardhaman', name: 'Purba Bardhaman', cities: [{ id: 'durgapur', name: 'Durgapur' }] },
      { id: 'purba_medinipur', name: 'Purba Medinipur', cities: [{ id: 'haldia', name: 'Haldia' }] },
      { id: 'purulia', name: 'Purulia', cities: [{ id: 'purulia_city', name: 'Purulia' }] },
      { id: 'south_24_parganas', name: 'South 24 Parganas', cities: [{ id: 'baruipur', name: 'Baruipur' }] },
      { id: 'uttar_dinajpur', name: 'Uttar Dinajpur', cities: [{ id: 'raiganj', name: 'Raiganj' }] },
      { id: 'west_bardhaman', name: 'West Bardhaman', cities: [{ id: 'asansol', name: 'Asansol' }] },
      { id: 'west_midnapore', name: 'West Midnapore', cities: [{ id: 'kharagpur', name: 'Kharagpur' }] }
    ]
  },
  {
    id: 'MH',
    name: 'Maharashtra',
    code: 'MH',
    region: 'west',
    districts: [
      { id: 'ahmednagar', name: 'Ahmednagar', cities: [{ id: 'ahmednagar_city', name: 'Ahmednagar' }] },
      { id: 'akola', name: 'Akola', cities: [{ id: 'akola_city', name: 'Akola' }] },
      { id: 'amravati', name: 'Amravati', cities: [{ id: 'amravati_city', name: 'Amravati' }] },
      { id: 'aurangabad', name: 'Aurangabad', cities: [{ id: 'aurangabad_city', name: 'Aurangabad' }] },
      { id: 'beed', name: 'Beed', cities: [{ id: 'beed_city', name: 'Beed' }] },
      { id: 'bhandara', name: 'Bhandara', cities: [{ id: 'bhandara_city', name: 'Bhandara' }] },
      { id: 'buldhana', name: 'Buldhana', cities: [{ id: 'buldhana_city', name: 'Buldhana' }] },
      { id: 'chandrapur', name: 'Chandrapur', cities: [{ id: 'chandrapur_city', name: 'Chandrapur' }] },
      { id: 'dhule', name: 'Dhule', cities: [{ id: 'dhule_city', name: 'Dhule' }] },
      { id: 'gadchiroli', name: 'Gadchiroli', cities: [{ id: 'gadchiroli_city', name: 'Gadchiroli' }] },
      { id: 'gondia', name: 'Gondia', cities: [{ id: 'gondia_city', name: 'Gondia' }] },
      { id: 'hingoli', name: 'Hingoli', cities: [{ id: 'hingoli_city', name: 'Hingoli' }] },
      { id: 'jalgaon', name: 'Jalgaon', cities: [{ id: 'jalgaon_city', name: 'Jalgaon' }] },
      { id: 'kolhapur', name: 'Kolhapur', cities: [{ id: 'kolhapur_city', name: 'Kolhapur' }] },
      { id: 'latur', name: 'Latur', cities: [{ id: 'latur_city', name: 'Latur' }] },
      { id: 'mumbai', name: 'Mumbai', cities: [{ id: 'mumbai_city', name: 'Mumbai' }, { id: 'navi_mumbai', name: 'Navi Mumbai' }] },
      { id: 'mumbai_suburban', name: 'Mumbai Suburban', cities: [{ id: 'mumbai_suburban_city', name: 'Mumbai Suburban' }] },
      { id: 'nagpur', name: 'Nagpur', cities: [{ id: 'nagpur_city', name: 'Nagpur' }] },
      { id: 'nanded', name: 'Nanded', cities: [{ id: 'nanded_city', name: 'Nanded' }] },
      { id: 'nandurbar', name: 'Nandurbar', cities: [{ id: 'nandurbar_city', name: 'Nandurbar' }] },
      { id: 'nashik', name: 'Nashik', cities: [{ id: 'nashik_city', name: 'Nashik' }] },
      { id: 'osmanabd', name: 'Osmanabd', cities: [{ id: 'osmanabd_city', name: 'Osmanabd' }] },
      { id: 'parabhani', name: 'Parabhani', cities: [{ id: 'parabhani_city', name: 'Parabhani' }] },
      { id: 'parbhani', name: 'Parbhani', cities: [{ id: 'parbhani_city', name: 'Parbhani' }] },
      { id: 'pune', name: 'Pune', cities: [{ id: 'pune_city', name: 'Pune' }] },
      { id: 'raigad', name: 'Raigad', cities: [{ id: 'raigad_city', name: 'Raigad' }] },
      { id: 'ratnagiri', name: 'Ratnagiri', cities: [{ id: 'ratnagiri_city', name: 'Ratnagiri' }] },
      { id: 'sangli', name: 'Sangli', cities: [{ id: 'sangli_city', name: 'Sangli' }] },
      { id: 'satara', name: 'Satara', cities: [{ id: 'satara_city', name: 'Satara' }] },
      { id: 'sindhudurg', name: 'Sindhudurg', cities: [{ id: 'sindhudurg_city', name: 'Sindhudurg' }] },
      { id: 'solapur', name: 'Solapur', cities: [{ id: 'solapur_city', name: 'Solapur' }] },
      { id: 'thane', name: 'Thane', cities: [{ id: 'thane_city', name: 'Thane' }] },
      { id: 'wardha', name: 'Wardha', cities: [{ id: 'wardha_city', name: 'Wardha' }] },
      { id: 'washim', name: 'Washim', cities: [{ id: 'washim_city', name: 'Washim' }] },
      { id: 'yavatmal', name: 'Yavatmal', cities: [{ id: 'yavatmal_city', name: 'Yavatmal' }] }
    ]
  },
  {
    id: 'KA',
    name: 'Karnataka',
    code: 'KA',
    region: 'south',
    districts: [
      { id: 'bagalkot', name: 'Bagalkot', cities: [{ id: 'bagalkot_city', name: 'Bagalkot' }] },
      { id: 'ballari', name: 'Ballari', cities: [{ id: 'ballari_city', name: 'Ballari' }] },
      { id: 'belagavi', name: 'Belagavi', cities: [{ id: 'belagavi_city', name: 'Belagavi' }] },
      { id: 'bengaluru_rural', name: 'Bengaluru Rural', cities: [{ id: 'bengaluru_rural_city', name: 'Bengaluru Rural' }] },
      { id: 'bengaluru_urban', name: 'Bengaluru Urban', cities: [{ id: 'bengaluru', name: 'Bangalore' }] },
      { id: 'bidar', name: 'Bidar', cities: [{ id: 'bidar_city', name: 'Bidar' }] },
      { id: 'chamarajanagar', name: 'Chamarajanagar', cities: [{ id: 'chamarajanagar_city', name: 'Chamarajanagar' }] },
      { id: 'chikballapur', name: 'Chikballapur', cities: [{ id: 'chikballapur_city', name: 'Chikballapur' }] },
      { id: 'chikmagalur', name: 'Chikmagalur', cities: [{ id: 'chikmagalur_city', name: 'Chikmagalur' }] },
      { id: 'chitradurga', name: 'Chitradurga', cities: [{ id: 'chitradurga_city', name: 'Chitradurga' }] },
      { id: 'dakshina_kannada', name: 'Dakshina Kannada', cities: [{ id: 'mangaluru', name: 'Mangaluru' }] },
      { id: 'davanagere', name: 'Davanagere', cities: [{ id: 'davanagere_city', name: 'Davanagere' }] },
      { id: 'dharwad', name: 'Dharwad', cities: [{ id: 'dharwad_city', name: 'Dharwad' }] },
      { id: 'gadag', name: 'Gadag', cities: [{ id: 'gadag_city', name: 'Gadag' }] },
      { id: 'hassan', name: 'Hassan', cities: [{ id: 'hassan_city', name: 'Hassan' }] },
      { id: 'haveri', name: 'Haveri', cities: [{ id: 'haveri_city', name: 'Haveri' }] },
      { id: 'kalaburagi', name: 'Kalaburagi', cities: [{ id: 'kalaburagi_city', name: 'Kalaburagi' }] },
      { id: 'kodagu', name: 'Kodagu', cities: [{ id: 'kodagu_city', name: 'Kodagu' }] },
      { id: 'kolar', name: 'Kolar', cities: [{ id: 'kolar_city', name: 'Kolar' }] },
      { id: 'koppal', name: 'Koppal', cities: [{ id: 'koppal_city', name: 'Koppal' }] },
      { id: 'mandya', name: 'Mandya', cities: [{ id: 'mandya_city', name: 'Mandya' }] },
      { id: 'mysuru', name: 'Mysuru', cities: [{ id: 'mysuru_city', name: 'Mysuru' }] },
      { id: 'raichur', name: 'Raichur', cities: [{ id: 'raichur_city', name: 'Raichur' }] },
      { id: 'shivamogga', name: 'Shivamogga', cities: [{ id: 'shivamogga_city', name: 'Shivamogga' }] },
      { id: 'tumkur', name: 'Tumkur', cities: [{ id: 'tumkur_city', name: 'Tumkur' }] },
      { id: 'udupi', name: 'Udupi', cities: [{ id: 'udupi_city', name: 'Udupi' }] },
      { id: 'uttara_kannada', name: 'Uttara Kannada', cities: [{ id: 'karwar', name: 'Karwar' }] },
      { id: 'vijayapura', name: 'Vijayapura', cities: [{ id: 'vijayapura_city', name: 'Vijayapura' }] },
      { id: 'yadgir', name: 'Yadgir', cities: [{ id: 'yadgir_city', name: 'Yadgir' }] }
    ]
  },
  {
    id: 'JH',
    name: 'Jharkhand',
    code: 'JH',
    region: 'east',
    districts: [
      { id: 'bokaro', name: 'Bokaro', cities: [{ id: 'bokaro_city', name: 'Bokaro' }] },
      { id: 'chatra', name: 'Chatra', cities: [{ id: 'chatra_city', name: 'Chatra' }] },
      { id: 'deoghar', name: 'Deoghar', cities: [{ id: 'deoghar_city', name: 'Deoghar' }] },
      { id: 'dhanbad', name: 'Dhanbad', cities: [{ id: 'dhanbad_city', name: 'Dhanbad' }] },
      { id: 'dumka', name: 'Dumka', cities: [{ id: 'dumka_city', name: 'Dumka' }] },
      { id: 'east_singhbhum', name: 'East Singhbhum', cities: [{ id: 'jamshedpur', name: 'Jamshedpur' }] },
      { id: 'garhwa', name: 'Garhwa', cities: [{ id: 'garhwa_city', name: 'Garhwa' }] },
      { id: 'giridih', name: 'Giridih', cities: [{ id: 'giridih_city', name: 'Giridih' }] },
      { id: 'godda', name: 'Godda', cities: [{ id: 'godda_city', name: 'Godda' }] },
      { id: 'gumla', name: 'Gumla', cities: [{ id: 'gumla_city', name: 'Gumla' }] },
      { id: 'hazaribagh', name: 'Hazaribagh', cities: [{ id: 'hazaribagh_city', name: 'Hazaribagh' }] },
      { id: 'jamtara', name: 'Jamtara', cities: [{ id: 'jamtara_city', name: 'Jamtara' }] },
      { id: 'khunti', name: 'Khunti', cities: [{ id: 'khunti_city', name: 'Khunti' }] },
      { id: 'koderma', name: 'Koderma', cities: [{ id: 'koderma_city', name: 'Koderma' }] },
      { id: 'latehar', name: 'Latehar', cities: [{ id: 'latehar_city', name: 'Latehar' }] },
      { id: 'lohardaga', name: 'Lohardaga', cities: [{ id: 'lohardaga_city', name: 'Lohardaga' }] },
      { id: 'pakur', name: 'Pakur', cities: [{ id: 'pakur_city', name: 'Pakur' }] },
      { id: 'palamu', name: 'Palamu', cities: [{ id: 'daltonganj', name: 'Daltonganj' }] },
      { id: 'pashchim_singhbhum', name: 'Pashchim Singhbhum', cities: [{ id: 'saraikela', name: 'Saraikela' }] },
      { id: 'ranchi', name: 'Ranchi', cities: [{ id: 'ranchi_city', name: 'Ranchi' }] },
      { id: 'sahibganj', name: 'Sahibganj', cities: [{ id: 'sahibganj_city', name: 'Sahibganj' }] },
      { id: 'seraikela_kharsawan', name: 'Seraikela Kharsawan', cities: [{ id: 'seraikela', name: 'Seraikela' }] },
      { id: 'simdega', name: 'Simdega', cities: [{ id: 'simdega_city', name: 'Simdega' }] },
      { id: 'west_singhbhum', name: 'West Singhbhum', cities: [{ id: 'chaibasa', name: 'Chaibasa' }] }
    ]
  }
]

export function getStateNames(): string[] {
  return indiaGeography.map(s => s.name).sort()
}

export function getState(stateName: string): State | undefined {
  return indiaGeography.find(s => s.name === stateName)
}

export function getStateByName(stateName: string): State | undefined {
  return indiaGeography.find(s => s.name === stateName)
}

export function getDistrictsByState(stateName: string): District[] {
  const state = getState(stateName)
  return state?.districts || []
}

export function getDistrictCoordinates(stateName: string, districtId: string): { latitude: number; longitude: number } {
  const state = getStateByName(stateName)
  const district = state?.districts.find(d => d.id === districtId)
  
  // If district has coordinates, use them. Otherwise use state center (default to India center)
  if (district && district.latitude && district.longitude) {
    return { latitude: district.latitude, longitude: district.longitude }
  }
  
  // Default to India's approximate center if no coordinates
  return { latitude: 20.5937, longitude: 78.9629 }
}
