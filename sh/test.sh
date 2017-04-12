(
  printf "Checking Code Style... "
  standard > stdout.tmp 2> stderr.tmp && (
    echo "passed"
  ) || (
    echo "failed" >&2
    cat stderr.tmp >&2
    cat stdout.tmp
    exit 2
  )
) && (
  printf "Unit Test... "
  node > stdout.tmp 2> stderr.tmp && (
    echo "passed"
  ) || (
    exitcode=$?
    echo "failed" >&2
    cat stderr.tmp >&2
    cat stdout.tmp
  )
)
