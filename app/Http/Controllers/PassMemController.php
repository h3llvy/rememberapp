<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePassMemRequest;
use App\Models\PassMem;
use Google\Client;
use Google\Service\Calendar;
use Hash;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PassMemController extends Controller
{
    public function index(Request $request)
    {
        $client = new Client();
        $client->setAuthConfig(__DIR__ . '/../../../config/client_secret.apps.googleusercontent.com.json');
        $client->setRedirectUri('http://localhost?q=1');
        if ($request->get('q')) {
            dd($request->query());

        }
//        http://localhost/?q=1&code=4/0Adeu5BU6QmINCEPqUuAuDI6vM8izuBBquZRkZ52dqCcK05PitMNzIh63DGozbUT7XH12NA&scope=https://www.googleapis.com/auth/calendar

//        $authToken = $client->fetchAccessTokenWithAuthCode('4/0Adeu5BUONe92NTqHpiUGJo_SAUCfFJ2lN4griIx6Oxn_LLG3dhgCeByFXn_ZG4DZGzBicA');
//        $client->setAccessToken('ya29.a0AfB_byDD4SdWxlsM-LVGUiCCE04Q8KS1UPMblMdZ7Y9oVxN9rTyyLNoW7isueqV7mBlDZQPjcOu58s-vFyu2HclKcesO0P6FyGEuxJG_49QG_2aFmeSxFSY95k9A8hJ0P5QyQVUHq_0CutFcAktJIx3kbsqP9hP_QTZs0AaCgYKAeYSARISFQHsvYls9v2Qh1N6fNHF0r5WhVkzoA0173');
//        $calendar = new Calendar($client);
//        dd($calendar->calendarList->listCalendarList()->getItems());
//        die();
        $authUrl = $client->createAuthUrl([\Google\Service\Calendar::CALENDAR]);

//        return redirect($authUrl);
//        $a = $client->getOAuth2Service()
//        die(var_dump(
//
//        ));


        $items = PassMem::orderBy('id', 'DESC')->get();

        return Inertia::render('PassMem/Index' , [
            'items' => $items
        ]);
    }

    public function store(StorePassMemRequest $request) : \Illuminate\Http\Response
    {
        $password = $request->validated('password');
        $passHash = Hash::make($password);

        $passMem = PassMem::create([
            'title' => $request->validated('title'),
            'passHash' => $passHash,
        ]);

        return response($passMem);
    }

    public function destroy(PassMem $passMem): \Illuminate\Http\Response
    {
        $passMem->delete();
        return response($passMem);
    }

    public function show(PassMem $passMem) : \Inertia\Response
    {
        return Inertia::render('PassMem/Show', [
            'passMem' => $passMem
        ]);
    }

    public function check(PassMem $passMem, Request $request):  \Illuminate\Http\Response
    {
        $password = $request->post('password');
        $isEqualed = Hash::check($password, $passMem->passHash);
        return response(['isEqualed' => $isEqualed]);
    }
}
