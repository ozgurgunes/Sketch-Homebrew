import send from 'sketch-module-google-analytics'

export default (label, value) => {
  const ID = 'UA-5738625-2'
  const payload = {}
  payload.ec = context.plugin.name()
  payload.ea = context.command.name()
  if (label) {
    payload.el = label
  }
  if (value) {
    payload.ev = value
  }
  return send(context, ID, 'event', payload)
}
