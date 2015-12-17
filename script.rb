require 'net/http'
require 'json'
uri = URI('http://192.168.0.17:8080/crest/v1/api')


count_req = 0
start = Time.now
beginning = Time.now
file = File.open('responses.csv', 'w')
counter = 0
while(true)
  if (Time.now - beginning)* 1000 / 33 > counter
    result = {}
    counter += 1
    response =JSON.parse(Net::HTTP.get(uri))
    #puts response
    result['carState'] = response['carState']

    result['carState'].delete('mCarFlags')
    result['carState'].delete('mWaterPressureKPa')
    result['carState'].delete('mFuelPressureKPa')

    result['carState'].delete('mOdometerKM')
    result['carState'].delete('mAntiLockActive')
    result['carState'].delete('mLastOpponentCollisionIndex')
    result['carState'].delete('mLastOpponentCollisionMagnitude')
    result['carState'].delete('mBoostActive')
    result['carState'].delete('mBoostAmount')

    result['lapInfo'] = response['participants']['mParticipantInfo'][0]
    result['lapInfo']['totalDist'] = response['eventInformation']['mTrackLength']
    result['wheelsAndTyres'] = {}
    result['wheelsAndTyres']['tyreTemps'] = response['wheelsAndTyres']['mTyreTemp']
    result['wheelsAndTyres']['tyreSlipSpeeds'] = response['wheelsAndTyres']['mTyreSlipSpeed']
    result['wheelsAndTyres']['brakeTemps'] = response['wheelsAndTyres']['mBrakeTempCelsius']



    result['time']=(Time.now-start)
    file.puts result.to_s
    puts result
  end
end


def self.time_diff_milli(start, finish)
  (finish - start) * 1000.0
end