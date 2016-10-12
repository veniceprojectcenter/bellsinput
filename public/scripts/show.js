$('#progress')
  .progress({
    text: {
      active  : 'filled {value} of {total} fields',
      success : '{total} Data Complete!'
    }
  })
;

$('#progress')
  .progress('increment')
;