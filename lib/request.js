const noop = () => { };
const NO_PARAMS = {};
const NO_HEADERS = {};
const OK_200 = [200, 201];

function request({
    method = 'GET', // тип запроса
    url, // url на который шлем запрос
    params = NO_PARAMS, // список query параметров
    headers = NO_HEADERS, // список заголовков запроса
    body, // тело запроса, данные которые мы отправляем
    responseType = 'json', // тип ответа
    requestType = 'json', // тип запроса при отправке данных
    okResponse = OK_200, // коды статусов обрабатываемых ответов
    checkStatusInResponse = false, // флаг для проверки статуса ответа
    onSuccess = noop, // функция обработки успешного ответа
    onError = noop, // функция обработки сетевой ошибки
}) {
    // создали объект XMLHttpRequest
    const req = new XMLHttpRequest();

    // формируем строку query параметров вида param1=value&param2=value2.....
    const urlParams = new URLSearchParams(params);
    const queryString = urlParams.toString();

    // конфигурация запроса перед отправкой, устанавливаем метод, url и добавляем query
    // параметры, если они были переданы в поле params
    req.open(method, url + (queryString ? `?${queryString}` : ''));

    // устанавливаем заголовки, если был передан список заголовков в поле headers
    Object.keys(headers).forEach((key) => {
        req.setRequestHeader(key, headers(key));
    });

    // устанавливаем тип ответа, по умолчанию ожидаем получить json
    req.responseType = responseType;

    // функция обработки успешного запроса
    req.onload = function (event) {
        const target = event.target;
        // проверяем коды статусов ответа, на соответствие полю okResponse
        // если пришел, какой-то другой код, то обрабатываем ответ как ошибочный
        if (!okResponse.includes(target.status)) {
            onError(target.statusText);
            return;
        }

        // проверяем статус в ответе
        if (checkStatusInResponse && target.response.status !== 'ok') {
            onError(target.statusText);
            // либо можно вывести сообщение о статусе
            // onError(target.response.status);
            return;
        }

        // передаем данные ответа в функцию onSuccess
        onSuccess(target.response);
    };

    // функция обработки сетевой ошибки
    req.onerror = function () {
        onError();
    };

    // формируем тело запроса(данные) для отправки на сервер
    let dataBody = body;

    // устанавливаем заголовки и формат отправки данных
    // в зависимости от типа запроса
    if (requestType === 'urlencoded') {
        req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        const bodyParams = new URLSearchParams(body);
        dataBody = bodyParams.toString();
    }

    if (requestType === 'json') {
        req.setRequestHeader('Content-type', 'application/json');
        dataBody = JSON.stringify(body);
    }

    // отправляем запрос вместе с данными
    req.send(dataBody);
}