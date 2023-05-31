// This example shows how to make a call to an open API (no authentication required)
// to retrieve asset price from a symbol(e.g., ETH) to another symbol (e.g., USD)

// CryptoCompare API https://min-api.cryptocompare.com/documentation?key=Price&cat=multipleSymbolsFullPriceEndpoint

// Refer to https://github.com/smartcontractkit/functions-hardhat-starter-kit#javascript-code

// Arguments can be provided when a request is initated on-chain and used in the request source code as shown below
const _student_id = "NTI5Mg=="
const _key = "QUFqSDg3Kjk2cC00NCNAaFc="
const _mietjammu = "mietjammu"

// make HTTP request
// const url = `https://min-api.cryptocompare.com/data/pricemultifull`
const url = ` https://pi360.net/site/api/student_meta_data.php?`
// console.log(`HTTP GET Request to ${url}?fsyms=${fromSymbol}&tsyms=${toSymbol}`)
console.log(`HTTP GET Request to ${url}?institute_id=${_mietjammu}&student_id=${_student_id}&key=${_key}`)

// construct the HTTP Request object. See: https://github.com/smartcontractkit/functions-hardhat-starter-kit#javascript-code
// params used for URL query parameters
// Example of query: https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=USD
const cryptoCompareRequest = Functions.makeHttpRequest({
  url: url,
  params: {
    institute_id: _mietjammu,
    student_id: _student_id,
    key: _key,
  },
})

// Execute the API request (Promise)
const cryptoCompareResponse = await cryptoCompareRequest
if (cryptoCompareResponse.error) {
  console.error(cryptoCompareResponse.error)
  throw Error("Request failed")
}

const data = cryptoCompareResponse["data"]
if (data.Response === "Error") {
  console.error(data.Message)
  throw Error(`Functional error. Read message: ${data.Message}`)
}

// extract the price, volume and lastMarket
const { Name: studentname, RollNumber: rollno, DateofAdmission: admissiondate } = data["student"][0]
console.log(
  `${studentname}
  ${rollno}
  ${admissiondate}
  `
)

// The final result is a JSON object
const result = {
  studentname,
  rollno,
  admissiondate,
}

// Convert JSON object to a string using JSON.stringify()
// Then encode it to a a bytes using the helper Functions.encodeString
return Functions.encodeString(JSON.stringify(result))
