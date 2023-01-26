import app from '@config/app'
import { config } from '@config/vars'

const PORT = config.PORT

app.listen(PORT, () => {
  console.log(`API is running on PORT: ${PORT}`)
})
