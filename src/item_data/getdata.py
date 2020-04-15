import requests

Key = '466EF362E995D07541925D9F4B86372F'
lang=['en','zh-TW']
for l in lang:
    start=0
    id=1
    while True:
        url = 'http://api.steampowered.com/IEconItems_440/GetSchemaItems/v0001/?key={}&language={}&start={}'.format(Key,l,start)
        r=requests.get(url)
        file_name = '{lang}_{id}.json'.format(lang=l,id=id)
        if r.status_code == 200:
            with open(file_name,'wb') as f:
                for i in r:
                    f.write(i)
                print('Saving: {}'.format(file_name))
            d=r.json()
            print(start)
            if 'next' in d['result'].keys():
                start=d['result']['next']
                id+=1
            else:
                break
        else:
            print('Download failed: {}'.format(file_name))
            break
lang=['en','zh-tw']              
for l in lang:
    url = 'http://api.steampowered.com/IEconItems_440/GetSchemaOverview/v0001/?key={}&language={}'.format(Key,l)
    r=requests.get(url)
    file_name = '{lang}_schema.json'.format(lang=l)
    if r.status_code == 200:
        with open(file_name,'wb') as f:
            for i in r:
                f.write(i)
            print('Saving: {}'.format(file_name))
    else:
        print('Download failed: {}'.format(file_name))
